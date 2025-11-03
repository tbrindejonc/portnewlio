'use client';

import {useQuery} from '@tanstack/react-query';
import {getExperiences} from '@functions/data/get_experiences';

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
    <div className='flex flex-col items-center space-y-10'>
      {failedFetch ? (
        <h2 className='font-outfit font-bold text-red-700 xl:text-2xl'>Échec du chargement des données</h2>
      ) : (
        <>
          <h2>Experiences</h2>
        </>
      )}
    </div>
  );
}
