import Image from 'next/image';

/**
 * Home page landing view
 */
export default function LandingView() {
  return (
    <section
      id='home-landing'
      className='relative flex h-screen w-full flex-col items-center justify-center space-y-[5vh] overflow-hidden xl:space-y-[10vh]'
    >
      <h1 className='text-center text-5xl xl:text-7xl'>Timothée Brindejonc</h1>
      <div className='flex flex-col items-center space-y-[5vh] xl:flex-row xl:space-y-0 xl:space-x-6'>
        <h2 className='text-creme text-center text-2xl xl:w-[30vw] xl:text-4xl'>Développeur frontend React et Vue</h2>
        <Image
          src={'/images/landing/me.png'}
          alt='Photo de moi'
          width={500}
          height={500}
          className={
            'shadow-pblue/50 size-[40vw] rounded-xl object-cover shadow-[0_0_4px_4px] xl:size-[15vw] xl:rounded-4xl'
          }
        />
      </div>
      <div className='shadow-pred absolute -top-10 size-[200vw] rounded-full shadow-2xl xl:-top-[150vh] xl:size-[120vw]'></div>
    </section>
  );
}
