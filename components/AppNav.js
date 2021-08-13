import React from 'react';
import Link from 'next/link';
import { ButtonDropdown } from '@geist-ui/react';

const classes = {
fixedContainer:{
   position: "fixed",
   top: 0,
   left: 0,
   right: 0,
   background: "snow"
},
flexContainer:{
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
},
}

const AppNav = () => {
   return(
      <div style={classes.fixedContainer}>
         <nav style={classes.flexContainer}>
            <Link href="/catalog" >
               <a style={classes.link}>Home</a>
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
            <ButtonDropdown size='small' type="success">
               <ButtonDropdown.Item main>
                  Add
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <Link href="/catalog/authors/create">
                     <a>Author</a>
                  </Link>
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <Link href="/catalog/genres/create">
                     <a>Genre</a>
                  </Link>
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <Link href="/catalog/books/create">
                     <a>Book</a>
                  </Link>
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <Link href="/catalog/bookinstances/create">
                     <a>Bookinstance</a>
                  </Link>
               </ButtonDropdown.Item>
            </ButtonDropdown>
         </nav>
      </div>
   )
}

export default AppNav