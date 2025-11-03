import Carousel from './Carousel';
import ProjectDescription from './ProjectDescription';
import {ProjectDisplayColor} from '@/app/types/app';
import {ProjectFull} from '@appVine/project_schemas';

type Props = {
  project: ProjectFull;
  displayColor: ProjectDisplayColor;
};

/**
 * Display a project for mobile devices
 *
 * @param project {ProjectFull} - project to display
 */
export default function ProjectMobileDisplay({project, displayColor}: Props) {
  return (
    <div className='font-outfit flex flex-col items-center space-y-6 p-4'>
      <Carousel images={project.Image} displayColor={displayColor} />
      <ProjectDescription project={project} displayColor={displayColor} />
    </div>
  );
}
