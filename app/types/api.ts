// error returned by the api
export type ApiError = {
  error: {
    code: number;
    message: string;
    details: unknown;
  };
};

// collection of items returned by the api
export type ApiCollection<T> = {
  type: string;
  count: number;
  items: T[];
};

// parameters from an api request with an id
export type ApiParams = {
  params: {
    id: string;
  };
};

// api link request parameters
export type ApiLinkParams = {
  params: {
    id: string;
    link_id: string;
  };
};
