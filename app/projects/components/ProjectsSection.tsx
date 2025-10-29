'use client';

import ProjectMobileDisplay from './ProjectMobileDisplay';
import {ProjectFull} from '@/app/utils/vine/project_schemas';
import {getProjects} from '@functions/data/get_projects';
import {useQuery} from '@tanstack/react-query';

/**
 * Display the projects
 */
export default function ProjectsSection() {
  // get the projects from database
  const {data} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  // check if the data is available
  const failedFetch = !data || data.items.length === 0;

  return (
    <div className='flex flex-col items-center space-y-10'>
      {failedFetch && (
        <h2 className='font-outfit font-bold text-red-700 xl:text-2xl'>Échec du chargement des données</h2>
      )}
      <div className='flex flex-col items-center space-y-[15vh]'>
        {data?.items.map((project: ProjectFull, index: number) => (
          <ProjectMobileDisplay key={project.id} project={project} displayColor={index % 2 === 0 ? 'red' : 'blue'} />
        ))}
      </div>
    </div>
  );
}
