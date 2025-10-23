import vine from '@vinejs/vine';
import {Infer} from '@vinejs/vine/types';

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const IMAGE_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
  project_id: vine.number(),
});

const IMAGE_CREATE_SCHEMA = vine.object({
  name: vine.string(),
  project_id: vine.number(),
});

const IMAGE_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
  project_id: vine.number(),
});

const IMAGE_DELETE_SCHEMA = vine.object({
  id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Image = Infer<typeof IMAGE_SCHEMA>;

export type ImageCreation = Infer<typeof IMAGE_CREATE_SCHEMA>;

export type ImageUpdate = Infer<typeof IMAGE_UPDATE_SCHEMA>;

export type ImageDeletion = Infer<typeof IMAGE_DELETE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const ImageValidator = vine.compile(IMAGE_SCHEMA);

export const ImageCreateValidator = vine.compile(IMAGE_CREATE_SCHEMA);

export const ImageUpdateValidator = vine.compile(IMAGE_UPDATE_SCHEMA);

export const ImageDeleteValidator = vine.compile(IMAGE_DELETE_SCHEMA);
