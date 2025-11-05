import {ApiCollection} from '@/app/types/api';
import {ProjectFull} from '@appVine/project_schemas';

/**
 * Fetch projects data from the API
 */
export const getProjects = async (): Promise<ApiCollection<ProjectFull>> => {
  // instanciate empty projects collection
  const emptyProjects: ApiCollection<ProjectFull> = {
    type: 'collection',
    count: 0,
    items: [],
  };

  // fetch data from the api
  const response = await fetch(`${process.env.API_URL}/api/projects?fullContent=true`);

  // if the request failed, return empty projects
  if (!response.ok) {
    console.error('❌ API error:', response.status, response.statusText);
    return emptyProjects;
  }

  // read data
  const data: ApiCollection<ProjectFull> = await response.json();

  // return the data
  return data;
};
