import React from 'react'
import Link from 'next/link'

const AppNav = () => {
   return(
      <div style={{
         position: "fixed",
         top: 0,
         left: 0,
         right: 0,
         background: "snow"
      }}>
      <nav
         style={{
            display: "flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"space-between",
            alignItems:"center",
            maxWidth:"1000px",
            margin:"auto",
            minHeight:"58px",
            paddingTop:"1.9vh 0",
            borderBottom:"1px solid lightgrey"
         }}
      >
         <Link href="/catalog">
            <a>Home</a>
         </Link>
      
         <Link href="/catalog/books">
            <a>Books</a>
         </Link>
      
         <Link href="/catalog/authors">
            <a>Authors</a>
         </Link>
      
         <Link href="/catalog/genres">
            <a>Genres</a>
         </Link>
      
         <Link href="/catalog/bookinstances">
            <a>Book Instances</a>
         </Link>
      
      
         <Link href="/catalog/authors/create">
            <a>+ author</a>
         </Link>
      
         <Link href="/catalog/genres/create">
            <a>+ genre</a>
         </Link>
   
         <Link href="/catalog/books/create">
            <a>+ book</a>
         </Link>
      
         <Link href="/catalog/bookinstances/create">
            <a>+ bookinstance</a>
         </Link>
      </nav>
      </div>
   )
}

export default AppNav