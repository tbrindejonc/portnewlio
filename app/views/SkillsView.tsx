import {getSkills} from '@functions/data/get_skills';
import {getQueryClient} from '@functions/app/get_query_client';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import SkillsSection from '@/app/components/home/SkillsSection';

/**
 * Home page skills view
 */
export default async function SkillsView() {
  // get server query client
  const queryClient = getQueryClient();

  // prefetch skills data
  await queryClient.prefetchQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section id='home-skills' className='flex h-fit w-full flex-col items-center justify-center'>
        <h2 className='text-center text-3xl'>Mes compétences</h2>
        <SkillsSection />
      </section>
    </HydrationBoundary>
  );
}
