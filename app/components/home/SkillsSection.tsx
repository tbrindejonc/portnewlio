'use client';

import Technology from '@/app/components/Technology';
import {TechnologyFull} from '@/app/utils/vine/technology_schemas';
import {getSkills} from '@functions/data/get_skills';
import {useQuery} from '@tanstack/react-query';

/**
 * Display the skills
 */
export default function SkillsSection() {
  // get the skills from database
  const {data} = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  // check if the data is available
  const failedFetch = !data || (data.frontend.length === 0 && data.backend.length === 0 && data.tools.length === 0);

  return (
    <div className='flex flex-col items-center space-y-10 xl:space-y-[10vh]'>
      {failedFetch && (
        <h2 className='font-outfit font-bold text-red-700 xl:text-2xl'>Échec du chargement des données</h2>
      )}
      <div className='font-outfit flex flex-col space-y-4 px-10 xl:flex-row xl:space-y-0 xl:space-x-[10vw]'>
        <h2 className='text-center text-3xl font-bold'>Frontend</h2>
        <div className='flex flex-row flex-wrap gap-3 xl:w-[20vw] xl:gap-5'>
          {data?.frontend.map((skill: TechnologyFull) => (
            <Technology key={skill.name} technology={skill} />
          ))}
        </div>
      </div>
      <div className='font-outfit flex flex-col space-y-4 px-10 xl:flex-row xl:space-y-0 xl:space-x-[10vw]'>
        <h2 className='text-center text-3xl font-bold'>Backend</h2>
        <div className='flex flex-row flex-wrap gap-3 xl:w-[20vw] xl:gap-5'>
          {data?.backend.map((skill: TechnologyFull) => (
            <Technology key={skill.name} technology={skill} />
          ))}
        </div>
      </div>
      <div className='font-outfit flex flex-col space-y-4 px-10 xl:flex-row xl:space-y-0 xl:space-x-[10vw]'>
        <h2 className='text-center text-3xl font-bold'>Outils</h2>
        <div className='flex flex-row flex-wrap gap-3 xl:w-[20vw] xl:gap-5'>
          {data?.tools.map((skill: TechnologyFull) => (
            <Technology key={skill.name} technology={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
