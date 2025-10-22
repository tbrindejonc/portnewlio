import vine from '@vinejs/vine';
import {Infer} from '@vinejs/vine/types';

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const HIGHLIGHT_SCHEMA = vine.object({
  id: vine.number(),
  text: vine.string(),
  project_id: vine.number(),
});

const HIGHLIGHT_CREATE_SCHEMA = vine.object({
  text: vine.string(),
  project_id: vine.number(),
});

const HIGHLIGHT_UPDATE_SCHEMA = vine.object({
  text: vine.string(),
  project_id: vine.number(),
});

const HIGHLIGHT_DELETE_SCHEMA = vine.object({
  id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type HighLight = Infer<typeof HIGHLIGHT_SCHEMA>;

export type HighLightCreation = Infer<typeof HIGHLIGHT_CREATE_SCHEMA>;

export type HighLightUpdate = Infer<typeof HIGHLIGHT_UPDATE_SCHEMA>;

export type HighLightDeletion = Infer<typeof HIGHLIGHT_DELETE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const HighLightValidator = vine.compile(HIGHLIGHT_SCHEMA);

export const HighLightCreateValidator = vine.compile(HIGHLIGHT_CREATE_SCHEMA);

export const HighLightUpdateValidator = vine.compile(HIGHLIGHT_UPDATE_SCHEMA);

export const HighLightDeleteValidator = vine.compile(HIGHLIGHT_DELETE_SCHEMA);
