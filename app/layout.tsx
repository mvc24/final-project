import './globals.css';
import { gql } from '@apollo/client';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import sageLogo from '../public/images/sageLogo.svg';
import { getClient } from '../util/apolloClient';
import LogoutButton from './(auth)/logout/LogoutButton';
import { ApolloClientProvider } from './ApolloClientProvider';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'sage',
  description: 'inspiration for creative cooking',
};

// type Props = {
//   children: ReactNode;
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // display username in the navigation and login & register buttons depending on user status
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const { data } = await getClient().query({
    query: gql`
      query LoggedInUser($token: String!) {
        loggedInUser(token: $token) {
          id
          username
        }
      }
    `,
    variables: {
      token: sessionToken?.value || '',
    },
  });
  console.log('data: ', data);

  // const user = !sessionToken?.value
  //   ? undefined
  //   : await getUserBySessionToken(sessionToken.value);

  // get logged in user, check repo

  return (
    <html lang="en" className="text-main-900">
      <body className={outfit.className}>
        <header className="bg-neutral-100">
          <nav className="navbar bg-neutral-100 text-main-700">
            <div className="navbar-start">
              <Link href="/">
                <Image src={sageLogo} alt="" className="h-12 w-auto px-4" />
              </Link>
              <div className="dropdown">
                <div className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link
                      className="transition hover:text-decoration-700"
                      href="/ingredients"
                    >
                      the ingredients
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition hover:text-decoration-700"
                      href="/howTo"
                    >
                      how to use this page
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition hover:text-decoration-700"
                      href="/about"
                    >
                      about
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 text-lg">
                <li>
                  <Link
                    className="transition hover:text-decoration-700 hover:bg-decoration-50 rounded-full"
                    href="/ingredients"
                  >
                    the ingredients
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition hover:text-decoration-700 hover:bg-decoration-50 rounded-full"
                    href="/howTo"
                  >
                    how to use this page
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition hover:text-decoration-700 hover:bg-decoration-50 rounded-full"
                    href="/about"
                  >
                    about
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-end gap-4">
              {data.loggedInUser ? (
                <div className="inline-flex gap-4">
                  <span className="btn px-5 rounded-full border-0 bg-main-700 text-main-50 hover:border-t-main-700 hover:bg-main-200 hover:text-main-700 hover:border-0 transform-none lowercase text-lg">
                    {data.loggedInUser?.username}
                  </span>
                  <LogoutButton />
                </div>
              ) : (
                <div className="inline-flex gap-4">
                  <Link
                    href="/login"
                    className="btn px-7 rounded-full border-0 bg-main-700 text-main-50 hover:border-t-main-700 hover:bg-main-200 hover:text-main-700 hover:border-0 transform-none lowercase text-lg"
                  >
                    login
                  </Link>
                  <Link
                    className="btn px-5 rounded-full btn-outline border-t-main-700 text-main-700 hover:bg-main-200 hover:text-main-700 hover:border-main-200 lowercase text-lg"
                    href="/signup"
                  >
                    sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </header>
        <ApolloClientProvider>{children}</ApolloClientProvider>
        <footer className="footer items-center p-4 bg-neutral-100 text-m text-main-700">
          <aside className="items-center grid-flow-col">
            <p>Copyright © 2023 - All right reserved</p>
          </aside>
          <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <Link href="https://www.instagram.com/mariavalencia24/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
