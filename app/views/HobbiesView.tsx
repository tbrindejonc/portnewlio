import HobbiesSection from '@/app/components/home/HobbiesSection';
import {getHobbies} from '@functions/data/get_hobbies';
import {getQueryClient} from '@functions/app/get_query_client';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';

/**
 * Home page hobbies view
 */
export default async function HobbiesView() {
  // get server query client
  const queryClient = getQueryClient();

  // prefetch hobbies data
  await queryClient.prefetchQuery({
    queryKey: ['hobbies'],
    queryFn: getHobbies,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section
        id='home-hobbies'
        className='flex h-fit min-h-screen w-full flex-col items-center justify-center overflow-hidden py-6'
      >
        <h2 className='text-center text-3xl'>Ce que j'aime faire</h2>
        <HobbiesSection />
      </section>
    </HydrationBoundary>
  );
}
