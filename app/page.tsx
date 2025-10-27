import HobbiesView from '@/app/views/HobbiesView';
import LandingView from '@/app/views/LandingView';
import SkillsView from '@/app/views/SkillsView';

export default function Home() {
  return (
    <main className='bg-dark font-bungee h-full w-full text-white'>
      <LandingView />
      <SkillsView />
      <HobbiesView />
    </main>
  );
}
