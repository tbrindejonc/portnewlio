import vine from '@vinejs/vine';
import {Infer} from '@vinejs/vine/types';

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const CATEGORY_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
});

const CATEGORY_CREATE_SCHEMA = vine.object({
  name: vine.string(),
});

const CATEGORY_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
});

const CATEGORY_DELETE_SCHEMA = vine.object({
  id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Category = Infer<typeof CATEGORY_SCHEMA>;

export type CategoryCreation = Infer<typeof CATEGORY_CREATE_SCHEMA>;

export type CategoryUpdate = Infer<typeof CATEGORY_UPDATE_SCHEMA>;

export type CategoryDeletion = Infer<typeof CATEGORY_DELETE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const categoryValidator = vine.compile(CATEGORY_SCHEMA);

export const categoryCreateValidator = vine.compile(CATEGORY_CREATE_SCHEMA);

export const categoryUpdateValidator = vine.compile(CATEGORY_UPDATE_SCHEMA);

export const categoryDeleteValidator = vine.compile(CATEGORY_DELETE_SCHEMA);
