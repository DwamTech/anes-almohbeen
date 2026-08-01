import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`page-container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="الله أنيس المحبين — الرئيسية">
          <Image src="/images/logo.png" alt="الله أنيس المحبين" width={754} height={277} sizes="220px" />
          <span>رحلة إلى معرفة الله</span>
        </Link>

        <div className={styles.developer}>
          <span>تصميم وتطوير شركة</span>
          <a href="https://dwam-tech.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع شركة Dwam Tech">
            <Image src="/images/02.webp" alt="Dwam Tech" width={4500} height={4500} sizes="76px" />
          </a>
        </div>

        <span className={styles.copy}>صُنع بحبّ لنشر المعرفة والخير</span>
      </div>
    </footer>
  );
}
