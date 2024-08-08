import NavLinks from "../nav-links/nav-links";
import Link from "next/link";
import styles from '@/app/ui/home.module.css';
import { headers } from "next/headers";


export default function MainHeader(){
    return (
        <header >

        <div className={styles.mainheader}>

            <NavLinks />
        </div>
          
        </header>
      );   

}