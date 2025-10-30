'use client';

import Carousel from '@/app/projects/components/Carousel';
import ProjectMobileDisplay from './ProjectMobileDisplay';
import {ProjectFull} from '@/app/utils/vine/project_schemas';
import {getProjects} from '@functions/data/get_projects';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import ProjectDescription from '@/app/projects/components/ProjectDescription';

/**
 * Display the projects
 */
export default function ProjectsSection() {
  // get the projects from database
  const {data} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  // index to track current displayed project
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);

  // update current project index on scroll
  useEffect(() => {
    const handleScroll = () => {
      // window height
      const sectionHeight = window.innerHeight;
      // little 20% offset to trigger earlier
      const offset = (sectionHeight / 100) * 20;
      // current scroll position
      const scrollY = window.scrollY;
      // calculate the current project index
      const index = Math.floor(scrollY / (sectionHeight - offset));
      setCurrentProjectIndex(index);
    };

    // listen to window directly and remove listener when component unmounts
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // check if the data is available
  const failedFetch = !data || data.items.length === 0;

  return (
    <div className='flex flex-col items-center space-y-10'>
      {failedFetch ? (
        <h2 className='font-outfit font-bold text-red-700 xl:text-2xl'>Échec du chargement des données</h2>
      ) : (
        <>
          <div id='projects-mobile' className='flex flex-col items-center space-y-[15vh] lg:hidden'>
            {data.items.map((project: ProjectFull, index: number) => (
              <ProjectMobileDisplay
                key={project.id}
                project={project}
                displayColor={index % 2 === 0 ? 'red' : 'blue'}
              />
            ))}
          </div>
          <div id='projects-desktop' className='hidden w-screen flex-col items-end px-[10vw] pt-[10vh] lg:flex'>
            <div className='fixed left-[10vw]'>
              <Carousel
                images={data.items[currentProjectIndex].Image}
                displayColor={currentProjectIndex % 2 === 0 ? 'red' : 'blue'}
              />
            </div>
            {data.items.map((project: ProjectFull, index: number) => {
              const isLastDisplayed = index === data.items.length - 1;

              return (
                <div key={`desktop_${project.id}`} className={`${isLastDisplayed ? 'h-[75vh]' : 'h-[100vh]'}`}>
                  <ProjectDescription project={project} displayColor={index % 2 === 0 ? 'red' : 'blue'} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
