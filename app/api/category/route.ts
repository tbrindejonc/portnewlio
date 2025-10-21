import {HTTP_CREATED} from '@/app/utils/constants/api';
import sendErrorResponse from '@/app/utils/functions/api/send_error_response';
import sendJsonResponse from '@/app/utils/functions/api/send_json_response';
import {prisma} from '@/app/utils/prisma/client';
import {CategoryCreation, categoryCreateValidator} from '@/app/utils/vine/category_schemas';
import {Category} from '@prisma/client';

/**
 * Create a new category
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: any = await request.json();

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
