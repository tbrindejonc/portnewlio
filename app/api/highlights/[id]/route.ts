import {HTTP_NOT_FOUND, HTTP_OK, MSG_NOT_FOUND} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {ApiError, ApiParams} from '@appTypes/api';
import {HighLight, HighLightUpdate, HighLightUpdateValidator} from '@appVine/highlight_schemas';

/**
 * Update a highlight
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
    const validatedData: HighLightUpdate = await HighLightUpdateValidator.validate(body);

    // update highlight in database
    const updatedHighlight: HighLight = await prisma.highlight.update({
      where: {
        id: parseInt(id),
      },
      data: validatedData,
    });

    // return updated highlight
    return sendJsonResponse<HighLight>(updatedHighlight, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get a highlight from id
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function GET(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get data from request
    const {id} = await apiParams.params;

    // get highlight from database
    const highlight: HighLight | null = await prisma.highlight.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // if the highlight does not exist, return not found error
    if (!highlight) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Highlight with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return highlight
    return sendJsonResponse<HighLight>(highlight, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Delete a highlight
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function DELETE(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get highlight id from params
    const {id} = await apiParams.params;

    // delete highlight from database
    const deletedHighlight: HighLight = await prisma.highlight.delete({
      where: {
        id: parseInt(id),
      },
    });

    // return deleted highlight
    return sendJsonResponse<HighLight>(deletedHighlight, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
