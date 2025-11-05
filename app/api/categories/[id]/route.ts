import {HTTP_NOT_FOUND, HTTP_OK, MSG_NOT_FOUND} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {Category, CategoryUpdate, categoryUpdateValidator} from '@appVine/category_schemas';
import {ApiError, ApiParams} from '@appTypes/api';

/**
 * Update a category
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
    const validatedData: CategoryUpdate = await categoryUpdateValidator.validate(body);

    // update category in database
    const updatedCategory: Category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: validatedData,
    });

    // return updated category
    return sendJsonResponse<Category>(updatedCategory, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get a category from id
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function GET(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get data from request
    const {id} = await apiParams.params;

    // get category from database
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // if the category does not exist, return not found error
    if (!category) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Category with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return category
    return sendJsonResponse<Category>(category, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Delete a category
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function DELETE(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get category id from params
    const {id} = await apiParams.params;

    // delete category from database
    const deletedCategory: Category = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    // return deleted category
    return sendJsonResponse<Category>(deletedCategory, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
