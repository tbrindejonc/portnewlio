import {HTTP_NOT_FOUND, HTTP_OK, MSG_NOT_FOUND} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {ApiError, ApiParams} from '@appTypes/api';
import {Technology, TechnologyFull, TechnologyUpdate, TechnologyUpdateValidator} from '@appVine/technology_schemas';

/**
 * Update a technology
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function PUT(request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // read received data
    const body: unknown = await request.json();
    const {id} = await apiParams.params;

    // validate data
    const validatedData: TechnologyUpdate = await TechnologyUpdateValidator.validate(body);

    // update technology in database
    const updatedTechnology: Technology = await prisma.technology.update({
      where: {
        id: parseInt(id),
      },
      data: validatedData,
    });

    // return updated technology
    return sendJsonResponse<Technology>(updatedTechnology, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get a technology from id
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

    // get technology from database
    const technology: Technology | TechnologyFull | null = await prisma.technology.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: !!fullContent,
      },
    });

    // if the technology does not exist, return not found error
    if (!technology) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Technology with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // if full content requested, return full technology
    if (fullContent) return sendJsonResponse<TechnologyFull>(technology as TechnologyFull, HTTP_OK);

    // return technology
    return sendJsonResponse<Technology>(technology, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Delete a technology
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function DELETE(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get technology id from params
    const {id} = await apiParams.params;

    // delete technology from database
    const deletedTechnology: Technology = await prisma.technology.delete({
      where: {
        id: parseInt(id),
      },
    });

    // return deleted technology
    return sendJsonResponse<Technology>(deletedTechnology, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
