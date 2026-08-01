import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`page-container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="الله أنيس المحبين — العودة للرئيسية">
          <Image src="/images/logo.png" alt="الله أنيس المحبين" width={754} height={277} priority sizes="180px" />
        </Link>
        <nav className={styles.nav} aria-label="التنقل الرئيسي">
          <Link href="/">الرئيسية</Link>
          <Link href="/#names">الأسماء الحسنى</Link>
          <Link href="/#about">عن الرحلة</Link>
        </nav>
        <Link href="/#names" className={styles.cta}>ابدأ الرحلة <span>←</span></Link>
      </div>
    </header>
  );
}
