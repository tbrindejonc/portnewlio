import vine from '@vinejs/vine';
import {Infer} from '@vinejs/vine/types';

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const PROJECT_SCHEMA = vine.object({
  id: vine.number(),
  title: vine.string(),
  description: vine.string(),
  github: vine.string(),
  link: vine.string(),
});

const PROJECT_FULL_SCHEMA = vine.object({
  id: vine.number(),
  title: vine.string(),
  description: vine.string(),
  github: vine.string(),
  link: vine.string(),
  Project_Technology: vine.array(
    vine.object({
      project_id: vine.number(),
      technology_id: vine.number(),
      technology: vine.object({
        id: vine.number(),
        name: vine.string(),
        logo_name: vine.string(),
        category_id: vine.number(),
      }),
    }),
  ),
  Highlight: vine.array(
    vine.object({
      id: vine.number(),
      text: vine.string(),
      project_id: vine.number(),
    }),
  ),
});

const PROJECT_CREATE_SCHEMA = vine.object({
  title: vine.string(),
  description: vine.string(),
  github: vine.string(),
  link: vine.string(),
});

const PROJECT_UPDATE_SCHEMA = vine.object({
  title: vine.string(),
  description: vine.string(),
  github: vine.string(),
  link: vine.string(),
});

const PROJECT_DELETE_SCHEMA = vine.object({
  id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Project = Infer<typeof PROJECT_SCHEMA>;

export type ProjectFull = Infer<typeof PROJECT_FULL_SCHEMA>;

export type ProjectCreation = Infer<typeof PROJECT_CREATE_SCHEMA>;

export type ProjectUpdate = Infer<typeof PROJECT_UPDATE_SCHEMA>;

export type ProjectDeletion = Infer<typeof PROJECT_DELETE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const ProjectValidator = vine.compile(PROJECT_SCHEMA);

export const ProjectFullValidator = vine.compile(PROJECT_FULL_SCHEMA);

export const ProjectCreateValidator = vine.compile(PROJECT_CREATE_SCHEMA);

export const ProjectUpdateValidator = vine.compile(PROJECT_UPDATE_SCHEMA);

export const ProjectDeleteValidator = vine.compile(PROJECT_DELETE_SCHEMA);
