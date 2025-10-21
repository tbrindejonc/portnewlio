import {HTTP_OK} from '@utils/constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {Category, CategoryUpdate, categoryUpdateValidator} from '@appVine/category_schemas';
import {ApiParams} from '@appTypes/api';

/**
 * Update a category
 *
 * @param request {Request} - The incoming request object
 */
export async function PUT(request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // read received data
    const body: any = await request.json();

    // validate data
    const validatedData: CategoryUpdate = await categoryUpdateValidator.validate(body);

    // update category in database
    const updatedCategory: Category = await prisma.category.update({
      where: {
        id: parseInt(apiParams.params.id),
      },
      data: validatedData,
    });

    // return updated category
    return sendJsonResponse<Category>(updatedCategory, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
