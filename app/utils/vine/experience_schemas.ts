import vine from '@vinejs/vine';
import {Infer} from '@vinejs/vine/types';

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const EXPERIENCE_SCHEMA = vine.object({
  id: vine.number(),
  title: vine.string(),
  society_name: vine.string(),
  work_period: vine.string(),
  description: vine.string(),
  logo_name: vine.string(),
});

const EXPERIENCE_FULL_SCHEMA = vine.object({
  id: vine.number(),
  title: vine.string(),
  society_name: vine.string(),
  work_period: vine.string(),
  description: vine.string(),
  logo_name: vine.string(),
  Experience_Technology: vine.array(
    vine.object({
      experience_id: vine.number(),
      technology_id: vine.number(),
      technology: vine.object({
        id: vine.number(),
        name: vine.string(),
        logo_name: vine.string(),
        category_id: vine.number(),
      }),
    }),
  ),
});

const EXPERIENCE_CREATE_SCHEMA = vine.object({
  title: vine.string(),
  society_name: vine.string(),
  work_period: vine.string(),
  description: vine.string(),
  logo_name: vine.string(),
});

const EXPERIENCE_UPDATE_SCHEMA = vine.object({
  title: vine.string(),
  society_name: vine.string(),
  work_period: vine.string(),
  description: vine.string(),
  logo_name: vine.string(),
});

const EXPERIENCE_DELETE_SCHEMA = vine.object({
  id: vine.number(),
});

const EXPERIENCE_TECHNOLOGY_SCHEMA = vine.object({
  experience_id: vine.number(),
  technology_id: vine.number(),
  technology: vine.object({
    id: vine.number(),
    name: vine.string(),
    logo_name: vine.string(),
    category_id: vine.number(),
  }),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Experience = Infer<typeof EXPERIENCE_SCHEMA>;

export type ExperienceFull = Infer<typeof EXPERIENCE_FULL_SCHEMA>;

export type ExperienceCreation = Infer<typeof EXPERIENCE_CREATE_SCHEMA>;

export type ExperienceUpdate = Infer<typeof EXPERIENCE_UPDATE_SCHEMA>;

export type ExperienceDeletion = Infer<typeof EXPERIENCE_DELETE_SCHEMA>;

export type ExperienceTechnology = Infer<typeof EXPERIENCE_TECHNOLOGY_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const ExperienceValidator = vine.compile(EXPERIENCE_SCHEMA);

export const ExperienceFullValidator = vine.compile(EXPERIENCE_FULL_SCHEMA);

export const ExperienceCreateValidator = vine.compile(EXPERIENCE_CREATE_SCHEMA);

export const ExperienceUpdateValidator = vine.compile(EXPERIENCE_UPDATE_SCHEMA);

export const ExperienceDeleteValidator = vine.compile(EXPERIENCE_DELETE_SCHEMA);

export const ExperienceTechnologyValidator = vine.compile(EXPERIENCE_TECHNOLOGY_SCHEMA);
