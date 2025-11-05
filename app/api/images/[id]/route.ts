import {HTTP_NOT_FOUND, HTTP_OK, MSG_NOT_FOUND} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {ApiError, ApiParams} from '@appTypes/api';
import {ImageUpdate, ImageUpdateValidator, Image} from '@appVine/image_schemas';

/**
 * Update an image
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
    const validatedData: ImageUpdate = await ImageUpdateValidator.validate(body);

    // update image in database
    const updatedImage: Image = await prisma.image.update({
      where: {
        id: parseInt(id),
      },
      data: validatedData,
    });

    // return updated image
    return sendJsonResponse<Image>(updatedImage, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get a image from id
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function GET(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get data from request
    const {id} = await apiParams.params;

    // get image from database
    const image: Image | null = await prisma.image.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // if the image does not exist, return not found error
    if (!image) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Image with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return image
    return sendJsonResponse<Image>(image, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Delete an image
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function DELETE(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get image id from params
    const {id} = await apiParams.params;

    // delete image from database
    const deletedImage: Image = await prisma.image.delete({
      where: {
        id: parseInt(id),
      },
    });

    // return deleted image
    return sendJsonResponse<Image>(deletedImage, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
