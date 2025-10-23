/**
 * Send a response in json format
 *
 * @param {T extends Object} data the data object to send
 * @param {number} code the http status code of the response
 *
 * @returns {Response} a response in json format
 */
const sendJsonResponse = <T>(data: T, code: number): Response => {
  return Response.json(data, {status: code});
};

export default sendJsonResponse;
