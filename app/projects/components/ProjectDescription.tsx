import PlusIcon from '@/app/components/icons/PlusIcon';
import SparklesIcon from '@/app/components/icons/SparklesIcon';
import Technology from '@/app/components/Technology';
import ProjectLink from './ProjectLink';
import {ProjectDisplayColor} from '@/app/types/app';
import {projectColors} from '@/app/utils/data/project_colors';
import {HighLight} from '@appVine/highlight_schemas';
import {ProjectFull, ProjectTechnology} from '@appVine/project_schemas';

type Props = {
  project: ProjectFull;
  displayColor: ProjectDisplayColor;
};

/**
 * Display a project information
 *
 * @param project {ProjectFull} - project to display
 * @param displayColor {ProjectDisplayColor} - color theme for the project display
 */
export default function ProjectDescription({project, displayColor}: Props) {
  return (
    <div className='lg:font-outfit flex flex-col space-y-8 lg:w-[30vw]'>
      <div className='flex w-full flex-row items-center justify-between self-start'>
        <div className='flex flex-row items-center space-x-2 lg:space-x-4'>
          <SparklesIcon className={`${projectColors[displayColor].text} size-8`} />
          <h2 className='lg:font-bungee text-3xl font-bold'>{project.title}</h2>
        </div>
        <div className='flex flex-row items-center space-x-4'>
          <ProjectLink link={project.github} type={'github'} displayColor={displayColor} />
          <ProjectLink link={project.link} type={'web'} displayColor={displayColor} />
        </div>
      </div>
      <p className='text-xl lg:text-2xl'>{project.description}</p>
      <div className='flex flex-col space-y-4 self-start'>
        {project.Highlight.map((highlight: HighLight) => (
          <div key={highlight.id} className='flex flex-row items-center space-x-2'>
            <PlusIcon className={`${projectColors[displayColor].text} size-6`} />
            <h3 className='text-creme lg:text-xl'>{highlight.text}</h3>
          </div>
        ))}
      </div>
      <div className='flex flex-row flex-wrap items-center gap-4'>
        {project.Project_Technology.map((projectTech: ProjectTechnology) => (
          <Technology key={projectTech.technology.id} technology={projectTech.technology} purpose='projects' />
        ))}
      </div>
    </div>
  );
}
