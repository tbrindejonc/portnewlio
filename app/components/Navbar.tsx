'use client';

import {NavLink} from '@appTypes/app';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

/**
 * Global navigation bar
 */
export default function Navbar() {
  // get current link pathname
  const pathname = usePathname();

  // navigation links
  const links: NavLink[] = [
    {href: '/', label: 'Accueil', bgColor: 'bg-sred'},
    {href: '/projects', label: 'Projets', bgColor: 'bg-sred'},
    {href: '/experiences', label: 'Expériences', bgColor: 'bg-sblue'},
    {href: '/contact', label: 'Contact', bgColor: 'bg-sblue'},
  ];

  return (
    <nav className='from-pred to-pblue fixed top-10 z-50 rounded-full bg-gradient-to-r p-0.5 xl:text-xl'>
      <div className='bg-dark flex flex-row items-center space-x-3 rounded-full p-2 text-white xl:space-x-10'>
        {
          /* Map through the links and create Link components */
          links.map((link: NavLink, index: number) => {
            // check if the link is active
            const isActive = pathname === link.href;

            return (
              <Link
                key={index}
                href={link.href}
                className={`hover:bg-darklight rounded-full p-2 transition-all duration-500 ease-in-out hover:cursor-pointer xl:px-4 ${isActive ? link.bgColor : ''}`}
              >
                {link.label}
              </Link>
            );
          })
        }
      </div>
    </nav>
  );
}
