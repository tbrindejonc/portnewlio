import {HTTP_CREATED} from '@/app/utils/constants/api';
import sendErrorResponse from '@/app/utils/functions/api/send_error_response';
import sendJsonResponse from '@/app/utils/functions/api/send_json_response';
import {CategoryCreation, categoryCreateValidator} from '@/app/utils/vine/category_schemas';

export async function POST(request: Request) {
  try {
    // read received data
    const body: any = await request.json();

    // validate data
    const validatedData: CategoryCreation = await categoryCreateValidator.validate(body);

    // return data to client for testing
    return sendJsonResponse<CategoryCreation>(validatedData, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
