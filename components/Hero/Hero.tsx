import Globe from "@/components/Globe/Globe";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`page-container ${styles.content}`}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}><span /> رحلة في رحاب أسماء الله الحسنى</div>
          <h1>
            <strong>وَلِلَّهِ الْأَسْمَاءُ</strong>
            <br />
            <em>الْحُسْنَىٰ</em> <strong>فَادْعُوهُ بِهَا</strong>
          </h1>
          {/* <p>كل اسمٍ باب، وكل معنى نور. رحلة قلبية نتعرّف فيها إلى الله بأسمائه، لنعبده حبًا ومعرفةً ويقينًا.</p> */}
        </div>

        <div className={styles.visual}>
          <div className={styles.orbit} aria-hidden="true">
            <div className={styles.ringOne} /><div className={styles.ringTwo} />
            <div className={styles.planet}><Globe /></div>
            <span className={`${styles.dot} ${styles.dotOne}`} />
            <span className={`${styles.dot} ${styles.dotTwo}`} />
          </div>
          <div className={styles.abdAllah}>
            <Image
              src="/images/abd-allah.png"
              alt="زخرفة خطية عربية"
              width={768}
              height={512}
              sizes="(max-width: 800px) 86vw, 440px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
