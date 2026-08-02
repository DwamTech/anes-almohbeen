import Image from "next/image";
import OrnamentIcon from "@/components/OrnamentIcon/OrnamentIcon";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={`page-container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.eyebrow}><span /> عن الرحلة</div>
          <h2>إِلهِي</h2>
          <p className={styles.lead}>ما أجلّ الموقفَ، وما أعظمَ المقامَ، وما أصعبَ الأمر!</p>
          <p className={styles.text}>
            الكلماتُ تعجزُ، والقلبُ يرتجفُ، واللّسانُ يعْثرُ، والعباراتُ تقْصُرُ، والعقلُ يحارُ، وعبدُك الضعيف يقفُ بين يديك، يريد أن يُـثني عليك، ويبُوح بما في نفسه لك، وأنت المطّلِع عَليه.
          </p>
          <a className={styles.download} href="/images/17104.pdf" download>
            <span className={styles.downloadIcon} aria-hidden="true">↓</span>
            <span><b>تحميل الكتاب</b><small>نسخة PDF كاملة</small></span>
          </a>
        </div>

        <div className={styles.bookSide}>
          <div className={styles.bookGlow} />
          <div className={styles.orbitOne} /><div className={styles.orbitTwo} />
          <Image
            className={styles.cover}
            src="/images/cover.png"
            alt="غلاف كتاب الله أنيس المحبين"
            width={535}
            height={500}
            sizes="(max-width: 760px) 82vw, 440px"
          />
          <div className={styles.bookBadge}><span><OrnamentIcon /></span><b>رحلة قلبية</b><small>في رحاب الأسماء الحسنى</small></div>
        </div>
      </div>
    </section>
  );
}
