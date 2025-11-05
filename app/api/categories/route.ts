import {HTTP_CREATED} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {CategoryCreation, categoryCreateValidator} from '@appVine/category_schemas';
import {Category} from '@prisma/client';
import sendCollectionResponse from '@functions/api/send_collection_response';

/**
 * Create a new category
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: unknown = await request.json();

    // validate data
    const validatedData: CategoryCreation = await categoryCreateValidator.validate(body);

    // create new category in database
    const createdCategory: Category = await prisma.category.create({
      data: validatedData,
    });

    // return created category
    return sendJsonResponse<Category>(createdCategory, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get all categories
 */
export async function GET(): Promise<Response> {
  try {
    // fetch all categories from database
    const categories: Category[] = await prisma.category.findMany();

    // return the categories collection
    return sendCollectionResponse<Category>(categories);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
