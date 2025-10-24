import Link from 'next/link';

/**
 * Global navigation bar
 */
export default function Navbar() {
  return (
    <nav className='from-pred to-pblue fixed top-10 z-10 rounded-full bg-gradient-to-r p-0.5'>
      <div className='bg-dark flex flex-row items-center space-x-6 rounded-full p-4 text-white'>
        <Link href='/' className='hover:cursor-pointer'>
          Accueil
        </Link>
        <Link href='/projects' className='hover:cursor-pointer'>
          Projets
        </Link>
        <Link href='/experiences' className='hover:cursor-pointer'>
          Expériences
        </Link>
        <Link href='/contact' className='hover:cursor-pointer'>
          Contact
        </Link>
      </div>
    </nav>
  );
}
