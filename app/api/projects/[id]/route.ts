import {HTTP_NOT_FOUND, HTTP_OK, MSG_NOT_FOUND} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import {ApiError, ApiParams} from '@appTypes/api';
import {Project, ProjectFull, ProjectUpdate, ProjectUpdateValidator} from '@appVine/project_schemas';

/**
 * Update a project
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function PUT(request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // read received data
    const body: any = await request.json();
    const {id} = await apiParams.params;

    // validate data
    const validatedData: ProjectUpdate = await ProjectUpdateValidator.validate(body);

    // update project in database
    const updatedProject: Project = await prisma.project.update({
      where: {
        id: parseInt(id),
      },
      data: validatedData,
    });

    // return updated project
    return sendJsonResponse<Project>(updatedProject, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get a project from id
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function GET(request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get data from request
    const {id} = await apiParams.params;
    const {searchParams} = new URL(request.url);
    const fullContent = searchParams.get('fullContent');

    // get project from database
    const project: Project | ProjectFull | null = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
      include: fullContent
        ? {
            Project_Technology: {
              include: {
                technology: true,
              },
            },
            Highlight: true,
            Image: true,
          }
        : undefined,
    });

    // if the project does not exist, return not found error
    if (!project) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Project with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return project with full content if requested
    if (fullContent) return sendJsonResponse<ProjectFull>(project as ProjectFull, HTTP_OK);

    // return project
    return sendJsonResponse<Project>(project, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Delete a project
 *
 * @param request {Request} - The incoming request object
 * @param apiParams {ApiParams} - The API parameters
 */
export async function DELETE(_request: Request, apiParams: ApiParams): Promise<Response> {
  try {
    // get project id from params
    const {id} = await apiParams.params;

    // delete project from database
    const deletedProject: Project = await prisma.project.delete({
      where: {
        id: parseInt(id),
      },
    });

    // return deleted project
    return sendJsonResponse<Project>(deletedProject, HTTP_OK);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
