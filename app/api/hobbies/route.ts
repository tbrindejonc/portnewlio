import {HTTP_CREATED} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import sendCollectionResponse from '@functions/api/send_collection_response';
import {Hobby, HobbyCreateValidator, HobbyCreation, HobbyFull} from '@appVine/hobby_schemas';

/**
 * Create a new hobby
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: any = await request.json();

    // validate data
    const validatedData: HobbyCreation = await HobbyCreateValidator.validate(body);

    // create new hobby in database
    const createdHobby: Hobby = await prisma.hobby.create({
      data: validatedData,
    });

    // return created hobby
    return sendJsonResponse<Hobby>(createdHobby, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get all hobbies
 */
export async function GET(request: Request): Promise<Response> {
  try {
    // get data from request
    const {searchParams} = new URL(request.url);
    const fullContent = searchParams.get('fullContent');

    // fetch all hobbies from database
    const hobbies: Hobby[] | HobbyFull[] = await prisma.hobby.findMany({
      include: {
        category: !!fullContent,
      },
    });

    // if full content requested, return full hobbies
    if (fullContent) return sendCollectionResponse<HobbyFull>(hobbies as HobbyFull[]);

    // return the highlights collection
    return sendCollectionResponse<Hobby>(hobbies);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
