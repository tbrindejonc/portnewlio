import {ApiCollection} from '@/app/types/api';
import {TechnologyFull} from '@/app/utils/vine/technology_schemas';

/**
 * Fetch skills data from the API
 */
export const getSkills = async () => {
  return await fetch('/api/technologies?fullContent=true')
    .then((res: Response) => {
      return res.json();
    })
    .then((data: ApiCollection<TechnologyFull>) => {
      console.log(data);
      return data;
    });
};
