import {HTTP_CREATED} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import sendCollectionResponse from '@functions/api/send_collection_response';
import {HighLightCreateValidator, HighLightCreation, HighLight} from '@utils/vine/highlight_schemas';

/**
 * Create a new highlight
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: any = await request.json();

    // validate data
    const validatedData: HighLightCreation = await HighLightCreateValidator.validate(body);

    // create new highlight in database
    const createdHighlight: HighLight = await prisma.highlight.create({
      data: validatedData,
    });

    // return created highlight
    return sendJsonResponse<HighLight>(createdHighlight, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get all highlights
 */
export async function GET(): Promise<Response> {
  try {
    // fetch all highlights from database
    const highlights: HighLight[] = await prisma.highlight.findMany();

    // return the highlights collection
    return sendCollectionResponse<HighLight>(highlights);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
