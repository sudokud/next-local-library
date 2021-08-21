import React from 'react';
import { ButtonDropdown } from '@geist-ui/react';
import ActiveLink from './ActiveLink'
import styles from '@/styles/AppNav.module.css'


const AppNav = () => {
   return(
      <div className={styles.fixedContainer}>
         <nav className={styles.flexContainer}>
            <ActiveLink activeClassName={styles.active} href="/catalog" >
               <a className={styles.navLink}>Home</a>
            </ActiveLink>
         
            <ActiveLink activeClassName={styles.active} href="/catalog/books">
               <a className={styles.navLink}>Books</a>
            </ActiveLink>
         
            <ActiveLink activeClassName={styles.active} href="/catalog/authors">
               <a className={styles.navLink}>Authors</a>
            </ActiveLink>
         
            <ActiveLink activeClassName={styles.active} href="/catalog/genres">
               <a className={styles.navLink}>Genres</a>
            </ActiveLink>
         
            <ActiveLink activeClassName={styles.active} href="/catalog/bookinstances">
               <a className={styles.navLink}>Book Instances</a>
            </ActiveLink>
            <ButtonDropdown size='small' type="success">
               <ButtonDropdown.Item main>
                  Add
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <ActiveLink activeClassName={styles.active} href="/catalog/authors/create">
                     <a className={styles.navLink}>Author</a>
                  </ActiveLink>
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <ActiveLink activeClassName={styles.active} href="/catalog/genres/create">
                     <a className={styles.navLink}>Genre</a>
                  </ActiveLink>
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <ActiveLink activeClassName={styles.active} href="/catalog/books/create">
                     <a className={styles.navLink}>Book</a>
                  </ActiveLink>
               </ButtonDropdown.Item>
               <ButtonDropdown.Item>
                  <ActiveLink activeClassName={styles.active} href="/catalog/bookinstances/create">
                     <a className={styles.navLink}>Bookinstance</a>
                  </ActiveLink>
               </ButtonDropdown.Item>
            </ButtonDropdown>
         </nav>
      </div>
   )
}

export default AppNav