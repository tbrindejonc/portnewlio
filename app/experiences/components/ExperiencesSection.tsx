'use client';

import {useQuery} from '@tanstack/react-query';
import {getExperiences} from '@functions/data/get_experiences';
import {ExperienceFull} from '@appVine/experience_schemas';
import Experience from './Experience';

/**
 * Display the experiences
 */
export default function ExperiencesSection() {
  // get the experiences from database
  const {data} = useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
  });

  // check if the data is available
  const failedFetch = !data || data.items.length === 0;

  return (
    <div className='flex flex-col items-center'>
      {failedFetch ? (
        <h2 className='font-outfit font-bold text-red-700 xl:text-2xl'>Échec du chargement des données</h2>
      ) : (
        <div className='flex flex-col space-y-10 p-4 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0'>
          {data.items.map((experience: ExperienceFull) => (
            <Experience key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </div>
  );
}
