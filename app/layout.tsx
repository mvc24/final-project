import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import sageLogo from '../public/images/sageLogo.svg';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'sage',
  description: 'inspiration for creative cooking',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <>
      <html lang="en">
        <body className={outfit.className}>
          <header className="bg-default">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
              <Image src={sageLogo} alt="" className="h-8" />
              <Link className="block text-primary" href="/">
                <span className="sr-only">home</span>
              </Link>

              <div className="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <Link
                        className="text-cambridge_blue-300"
                        href="/ingredients"
                      >
                        the ingredients
                      </Link>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/"
                      >
                        Careers
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/"
                      >
                        History
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/"
                      >
                        Services
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/"
                      >
                        Projects
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="flex items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                      href="/"
                    >
                      Login
                    </a>

                    <a
                      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                      href="/"
                    >
                      Register
                    </a>
                  </div>

                  <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                    <span className="sr-only">Toggle menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <nav>
            <Link href="/">home</Link>
            <Link href="/ingredients">the ingredients</Link>
            <Link href="/howTo">how to use this page</Link>
            <Link href="/about">about</Link>
            <Link href="/login">login</Link>
            <Link href="/signup">sign up</Link>
          </nav>
          {props.children}
        </body>
      </html>
    </>
  );
}
