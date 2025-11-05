import {HTTP_CREATED} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import sendCollectionResponse from '@functions/api/send_collection_response';
import {Technology, TechnologyCreateValidator, TechnologyCreation, TechnologyFull} from '@appVine/technology_schemas';

/**
 * Create a new technology
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: unknown = await request.json();

    // validate data
    const validatedData: TechnologyCreation = await TechnologyCreateValidator.validate(body);

    // create new technology in database
    const createdTechnology: Technology = await prisma.technology.create({
      data: validatedData,
    });

    // return created technology
    return sendJsonResponse<Technology>(createdTechnology, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get all technologies
 */
export async function GET(request: Request): Promise<Response> {
  try {
    // get data from request
    const {searchParams} = new URL(request.url);
    const fullContent = searchParams.get('fullContent');

    // fetch all technologies from database
    const technologies: Technology[] | TechnologyFull[] = await prisma.technology.findMany({
      include: {
        category: !!fullContent,
      },
    });

    // if full content requested, return full technologies
    if (fullContent) return sendCollectionResponse<TechnologyFull>(technologies as TechnologyFull[]);

    // return the technologies collection
    return sendCollectionResponse<Technology>(technologies);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
