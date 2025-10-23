import {HTTP_CREATED} from '@constants/api';
import sendErrorResponse from '@functions/api/send_error_response';
import sendJsonResponse from '@functions/api/send_json_response';
import {prisma} from '@utils/prisma/client';
import sendCollectionResponse from '@functions/api/send_collection_response';
import {Project, ProjectCreateValidator, ProjectCreation, ProjectFull} from '@appVine/project_schemas';

/**
 * Create a new project
 *
 * @param request {Request} - The incoming request object
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // read received data
    const body: any = await request.json();

    // validate data
    const validatedData: ProjectCreation = await ProjectCreateValidator.validate(body);

    // create new project in database
    const createdProject: Project = await prisma.project.create({
      data: validatedData,
    });

    // return created project
    return sendJsonResponse<Project>(createdProject, HTTP_CREATED);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}

/**
 * Get all projects
 *
 * @param request {Request} - The incoming request object
 */
export async function GET(request: Request): Promise<Response> {
  try {
    // get data from request
    const {searchParams} = new URL(request.url);
    const fullContent = searchParams.get('fullContent');

    // fetch all projects from database
    const projects: Project[] | ProjectFull[] = await prisma.project.findMany({
      include: fullContent
        ? {
            Project_Technology: {
              include: {
                technology: true,
              },
            },
            Highlight: true,
          }
        : undefined,
    });

    // return projects with full content if requested
    if (fullContent) return sendCollectionResponse<ProjectFull>(projects as ProjectFull[]);

    // return the projects collection
    return sendCollectionResponse<Project>(projects);
  } catch (error: unknown) {
    return sendErrorResponse(error);
  }
}
