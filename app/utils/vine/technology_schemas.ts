import vine from '@vinejs/vine';
import {Infer} from '@vinejs/vine/types';

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const TECHNOLOGY_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
  logo_name: vine.string(),
  category_id: vine.number(),
});

const TECHNOLOGY_FULL_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
  logo_name: vine.string(),
  category_id: vine.number(),
  category: vine.object({
    id: vine.number(),
    name: vine.string(),
  }),
});

const TECHNOLOGY_CREATE_SCHEMA = vine.object({
  name: vine.string(),
  logo_name: vine.string(),
  category_id: vine.number(),
});

const TECHNOLOGY_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
  logo_name: vine.string(),
  category_id: vine.number(),
});

const TECHNOLOGY_DELETE_SCHEMA = vine.object({
  id: vine.number(),
});

const TECHNOLOGY_LINK_PROJECT_SCHEMA = vine.object({
  technology_id: vine.number(),
  project_id: vine.number(),
});

const TECHNOLOGY_LINK_EXPERIENCE_SCHEMA = vine.object({
  technology_id: vine.number(),
  experience_id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Technology = Infer<typeof TECHNOLOGY_SCHEMA>;

export type TechnologyFull = Infer<typeof TECHNOLOGY_FULL_SCHEMA>;

export type TechnologyCreation = Infer<typeof TECHNOLOGY_CREATE_SCHEMA>;

export type TechnologyUpdate = Infer<typeof TECHNOLOGY_UPDATE_SCHEMA>;

export type TechnologyDeletion = Infer<typeof TECHNOLOGY_DELETE_SCHEMA>;

export type TechnologyLinkProject = Infer<typeof TECHNOLOGY_LINK_PROJECT_SCHEMA>;

export type TechnologyLinkExperience = Infer<typeof TECHNOLOGY_LINK_EXPERIENCE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const TechnologyValidator = vine.compile(TECHNOLOGY_SCHEMA);

export const TechnologyFullValidator = vine.compile(TECHNOLOGY_FULL_SCHEMA);

export const TechnologyCreateValidator = vine.compile(TECHNOLOGY_CREATE_SCHEMA);

export const TechnologyUpdateValidator = vine.compile(TECHNOLOGY_UPDATE_SCHEMA);

export const TechnologyDeleteValidator = vine.compile(TECHNOLOGY_DELETE_SCHEMA);

export const TechnologyLinkProjectValidator = vine.compile(TECHNOLOGY_LINK_PROJECT_SCHEMA);

export const TechnologyLinkExperienceValidator = vine.compile(TECHNOLOGY_LINK_EXPERIENCE_SCHEMA);
