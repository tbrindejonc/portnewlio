import PlusIcon from '@/app/components/icons/PlusIcon';
import SparklesIcon from '@/app/components/icons/SparklesIcon';
import Technology from '@/app/components/Technology';
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
    <>
      <div className='flex flex-row items-center space-x-4 self-start'>
        <SparklesIcon className={`${projectColors[displayColor].text} size-10`} />
        <h2 className='text-2xl font-bold'>{project.title}</h2>
      </div>
      <p>{project.description}</p>
      <div className='flex flex-col space-y-4 self-start'>
        {project.Highlight.map((highlight: HighLight) => (
          <div key={highlight.id} className='flex flex-row items-center space-x-2'>
            <PlusIcon className={`${projectColors[displayColor].text} size-4`} />
            <h3>{highlight.text}</h3>
          </div>
        ))}
      </div>
      <div className='flex flex-row flex-wrap items-center gap-4'>
        {project.Project_Technology.map((projectTech: ProjectTechnology) => (
          <Technology key={projectTech.technology.id} technology={projectTech.technology} />
        ))}
      </div>
    </>
  );
}
