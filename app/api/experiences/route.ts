import {HTTP_CREATED} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import sendCollectionResponse from '@functions/api/send_collection_response';
import {Experience, ExperienceCreateValidator, ExperienceCreation, ExperienceFull} from '@appVine/experience_schemas';

/**
 * Create a new experience
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: unknown = await request.json();

    // validate data
    const validatedData: ExperienceCreation = await ExperienceCreateValidator.validate(body);

    // create new experience in database
    const createdExperience: Experience = await prisma.experience.create({
      data: validatedData,
    });

    // return created experience
    return sendJsonResponse<Experience>(createdExperience, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get all experiences
 *
 * @param request {Request} - The incoming request object
 */
export async function GET(request: Request): Promise<Response> {
  try {
    // get data from request
    const {searchParams} = new URL(request.url);
    const fullContent = searchParams.get('fullContent');

    // fetch all experiences from database
    const experiences: Experience[] | ExperienceFull[] = await prisma.experience.findMany({
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

    // return experiences with full content if requested
    if (fullContent) return sendCollectionResponse<ExperienceFull>(experiences as ExperienceFull[]);

    // return the experiences collection
    return sendCollectionResponse<Experience>(experiences);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
