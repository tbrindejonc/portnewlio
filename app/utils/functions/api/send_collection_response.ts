import {ApiCollection} from '@appTypes/api';
import {HTTP_OK} from '@constants/api';

/**
 * Send a collection response in json format
 *
 * @param {T extends Object[]} data the data object array to send
 *
 * @returns {Response} a collection response in json format
 */
const sendCollectionResponse = <T>(data: T[]): Response => {
  const collectionReturn: ApiCollection<T> = {
    type: 'collection',
    count: data.length,
    items: data,
  };

  return Response.json(collectionReturn, {status: HTTP_OK});
};

export default sendCollectionResponse;
