import {HTTP_NOT_FOUND, HTTP_OK, MSG_NOT_FOUND} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {ApiError, ApiParams} from '@appTypes/api';
import {Hobby, HobbyFull, HobbyUpdate, HobbyUpdateValidator} from '@appVine/hobby_schemas';

/**
 * Update a hobby
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
    const validatedData: HobbyUpdate = await HobbyUpdateValidator.validate(body);

    // update hobby in database
    const updatedHobby: Hobby = await prisma.hobby.update({
      where: {
        id: parseInt(id),
      },
      data: validatedData,
    });

    // return updated hobby
    return sendJsonResponse<Hobby>(updatedHobby, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get a hobby from id
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

    // get hobby from database
    const hobby: Hobby | HobbyFull | null = await prisma.hobby.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: !!fullContent,
      },
    });

    // if the hobby does not exist, return not found error
    if (!hobby) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Hobby with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // if full content requested, return full hobby
    if (fullContent) return sendJsonResponse<HobbyFull>(hobby as HobbyFull, HTTP_OK);

    // return hobby
    return sendJsonResponse<Hobby>(hobby, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Delete a hobby
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function DELETE(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get hobby id from params
    const {id} = await apiParams.params;

    // delete hobby from database
    const deletedHobby: Hobby = await prisma.hobby.delete({
      where: {
        id: parseInt(id),
      },
    });

    // return deleted hobby
    return sendJsonResponse<Hobby>(deletedHobby, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
