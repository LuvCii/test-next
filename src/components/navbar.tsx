import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div><div>
          <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
            <div className="mb-2 sm:mb-0">
              <Link
                href="/home"
                className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
              >
                <a>Home</a>
                
              </Link>
            </div>
            <div>
              <Link href="/products">
                <a className=" hover:underline text-lg no-underline text-grey-darkest hover:text-blue-dark mx-2">
                  Product
                </a>
              </Link>
              <Link href="/signin">
                <a className="hover:underline text-lg no-underline text-grey-darkest hover:text-blue-dark mx-2">
                  Signin
                </a>
              </Link>
              <Link href="/signup">
                <a className="hover:underline text-lg no-underline text-grey-darkest hover:text-blue-dark mx-2">
                  Signup
                </a>
              </Link>
            </div>
          </nav>
        </div></div>
  )
}

export default Navbar