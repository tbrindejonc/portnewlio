import {getQueryClient} from '@functions/app/get_query_client';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import {getExperiences} from '@functions/data/get_experiences';
import ExperiencesSection from '../components/ExperiencesSection';

/**
 * Experiences page main view
 */
export default async function ExperiencesView() {
  // get server query client
  const queryClient = getQueryClient();

  // prefetch experiences data
  await queryClient.prefetchQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section
        id='experiences'
        className='flex h-fit min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-[15vh] lg:pt-[5vh]'
      >
        <ExperiencesSection />
      </section>
    </HydrationBoundary>
  );
}
