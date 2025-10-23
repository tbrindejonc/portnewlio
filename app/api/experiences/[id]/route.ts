import {HTTP_NOT_FOUND, HTTP_OK, MSG_NOT_FOUND} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {ApiError, ApiParams} from '@appTypes/api';
import {Experience, ExperienceFull, ExperienceUpdate, ExperienceUpdateValidator} from '@appVine/experience_schemas';

/**
 * Update an experience
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function PUT(request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // read received data
    const body: any = await request.json();
    const {id} = await apiParams.params;

    // validate data
    const validatedData: ExperienceUpdate = await ExperienceUpdateValidator.validate(body);

    // update experience in database
    const updatedExperience: ExperienceUpdate = await prisma.experience.update({
      where: {
        id: parseInt(id),
      },
      data: validatedData,
    });

    // return updated experience
    return sendJsonResponse<ExperienceUpdate>(updatedExperience, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get an experience from id
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function GET(request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get data from request
    const {id} = await apiParams.params;
    const {searchParams} = new URL(request.url);
    const fullContent = searchParams.get('fullContent');

    // get experience from database
    const experience: Experience | ExperienceFull | null = await prisma.experience.findUnique({
      where: {
        id: parseInt(id),
      },
      include: fullContent
        ? {
            Experience_Technology: {
              include: {
                technology: true,
              },
            },
          }
        : undefined,
    });

    // if the experience does not exist, return not found error
    if (!experience) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Experience with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return experience with full content if requested
    if (fullContent) return sendJsonResponse<ExperienceFull>(experience as ExperienceFull, HTTP_OK);

    // return experience
    return sendJsonResponse<Experience>(experience, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Delete an experience
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function DELETE(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get experience id from params
    const {id} = await apiParams.params;

    // delete experience from database
    const deletedExperience: Experience = await prisma.experience.delete({
      where: {
        id: parseInt(id),
      },
    });

    // return deleted experience
    return sendJsonResponse<Experience>(deletedExperience, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
