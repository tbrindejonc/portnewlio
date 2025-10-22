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
  category: vine
    .object({
      id: vine.number(),
      name: vine.string(),
    })
    .optional(),
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

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Technology = Infer<typeof TECHNOLOGY_SCHEMA>;

export type TechnologyCreation = Infer<typeof TECHNOLOGY_CREATE_SCHEMA>;

export type TechnologyUpdate = Infer<typeof TECHNOLOGY_UPDATE_SCHEMA>;

export type TechnologyDeletion = Infer<typeof TECHNOLOGY_DELETE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const TechnologyValidator = vine.compile(TECHNOLOGY_SCHEMA);

export const TechnologyCreateValidator = vine.compile(TECHNOLOGY_CREATE_SCHEMA);

export const TechnologyUpdateValidator = vine.compile(TECHNOLOGY_UPDATE_SCHEMA);

export const TechnologyDeleteValidator = vine.compile(TECHNOLOGY_DELETE_SCHEMA);
