import {TechnologyLinkExperience} from '@appVine/technology_schemas';
import {ApiLinkParams} from '@appTypes/api';
import {HTTP_OK} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';

/**
 * Link a technology to an experience
 *
 * @param request {Request} - The incoming request object
 * @param apiLinkParams {ApiLinkParams} - The API link parameters
 */
export async function POST(_request: Request, apiLinkParams: ApiLinkParams): Promise<Response> {
  try {
    // read received data
    const {id, link_id} = await apiLinkParams.params;

    // link technology to experience in database
    const linkedTechnologyAndExperience: TechnologyLinkExperience = await prisma.experience_Technology.create({
      data: {
        technology_id: parseInt(id),
        experience_id: parseInt(link_id),
      },
    });

    // return created link
    return sendJsonResponse<TechnologyLinkExperience>(linkedTechnologyAndExperience, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
