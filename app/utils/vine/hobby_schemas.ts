import vine from '@vinejs/vine';
import {Infer} from '@vinejs/vine/types';

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const HOBBY_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
  logo_name: vine.string(),
  category_id: vine.number(),
});

const HOBBY_CREATE_SCHEMA = vine.object({
  name: vine.string(),
  logo_name: vine.string(),
  category_id: vine.number(),
});

const HOBBY_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
  logo_name: vine.string(),
  category_id: vine.number(),
});

const HOBBY_DELETE_SCHEMA = vine.object({
  id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Hobby = Infer<typeof HOBBY_SCHEMA>;

export type HobbyCreation = Infer<typeof HOBBY_CREATE_SCHEMA>;

export type HobbyUpdate = Infer<typeof HOBBY_UPDATE_SCHEMA>;

export type HobbyDeletion = Infer<typeof HOBBY_DELETE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const HobbyValidator = vine.compile(HOBBY_SCHEMA);

export const HobbyCreateValidator = vine.compile(HOBBY_CREATE_SCHEMA);

export const HobbyUpdateValidator = vine.compile(HOBBY_UPDATE_SCHEMA);

export const HobbyDeleteValidator = vine.compile(HOBBY_DELETE_SCHEMA);
