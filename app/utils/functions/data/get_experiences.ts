import {ApiCollection} from '@/app/types/api';
import {ExperienceFull} from '@appVine/experience_schemas';

/**
 * Fetch experiences data from the API
 */
export const getExperiences = async (): Promise<ApiCollection<ExperienceFull>> => {
  // instanciate empty experiences collection
  const emptyExperiences: ApiCollection<ExperienceFull> = {
    type: 'collection',
    count: 0,
    items: [],
  };

  // fetch data from the api
  const response = await fetch(`${process.env.API_URL}/api/experiences?fullContent=true`);

  // if the request failed, return empty experiences
  if (!response.ok) {
    console.error('❌ API error:', response.status, response.statusText);
    return emptyExperiences;
  }

  // read data
  const data: ApiCollection<ExperienceFull> = await response.json();

  // return the data
  return data;
};
