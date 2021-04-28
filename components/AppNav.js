import React from 'react'
import Link from 'next/link'
import { Divider } from '@geist-ui/react'

const AppNav = () => {
   return(
      <aside>
         <nav>
            <ul>
               <li>
                  <Link href="/">
                     <a>Home</a>
                  </Link>
               </li>
               <li >
                  <Link href="/catalog/books">
                     <a>All Books</a>
                  </Link>
               </li>
               <li >
                  <Link href="/catalog/authors">
                     <a>All Authors</a>
                  </Link>
               </li>
               <li >
                  <Link href="/catalog/genres">
                     <a>All Genres</a>
                  </Link>
               </li>
               <li >
                  <Link href="/catalog/bookinstances">
                     <a>All Book Instances</a>
                  </Link>
               </li>
               <Divider />
               <li >
                  <Link href="/catalog/authors/create">
                     <a>Create new author</a>
                  </Link>
               </li>
               <li >
                  <Link href="/catalog/genres/create">
                     <a>Create new genre</a>
                  </Link>
               </li>
               <li >
                  <Link href="/catalog/books/create">
                     <a>Create new book</a>
                  </Link>
               </li>
               <li >
                  <Link href="/catalog/bookinstances/create">
                     <a>Create new book instance (copy)</a>
                  </Link>
               </li>
            </ul>
         </nav>
      </aside>
   )
}

export default AppNav