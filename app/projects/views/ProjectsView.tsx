import {getQueryClient} from '@functions/app/get_query_client';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import {getProjects} from '@functions/data/get_projects';
import ProjectsSection from '../components/ProjectsSection';

/**
 * Projects page main view
 */
export default async function ProjectsView() {
  // get server query client
  const queryClient = getQueryClient();

  // prefetch projects data
  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section
        id='projects'
        className='flex h-fit min-h-screen w-full flex-col items-center justify-center overflow-hidden'
      >
        <ProjectsSection />
      </section>
    </HydrationBoundary>
  );
}
