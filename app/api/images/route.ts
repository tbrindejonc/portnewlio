import {HTTP_CREATED} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import sendCollectionResponse from '@functions/api/send_collection_response';
import {ImageCreateValidator, ImageCreation, Image} from '@appVine/image_schemas';

/**
 * Create a new image
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: unknown = await request.json();

    // validate data
    const validatedData: ImageCreation = await ImageCreateValidator.validate(body);

    // create new image in database
    const createdImage: Image = await prisma.image.create({
      data: validatedData,
    });

    // return created image
    return sendJsonResponse<Image>(createdImage, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get all images
 */
export async function GET(): Promise<Response> {
  try {
    // fetch all images from database
    const images: Image[] = await prisma.image.findMany();

    // return the images collection
    return sendCollectionResponse<Image>(images);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
