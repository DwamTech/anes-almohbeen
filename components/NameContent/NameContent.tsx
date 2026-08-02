import type { DivineName } from "@/data/names";
import { youtubeChannelUrl, youtubeVideosByName } from "@/data/youtubeVideos";
import DivineNameText from "@/components/DivineNameText/DivineNameText";
import OrnamentIcon from "@/components/OrnamentIcon/OrnamentIcon";
import styles from "./NameContent.module.css";

export default function NameContent({ item }: { item: DivineName }) {
  const videoId = youtubeVideosByName[item.name];

  return (
    <section className={styles.contentSection}>
      <div className={styles.articleHeading}>
        <span>تأمّل واقرأ</span>
        <h2>رحلة مع اسم الله «<DivineNameText name={item.name} />»</h2>
        <p>معرفة أسماء الله ليست حفظًا للألفاظ فحسب، بل حياةٌ للقلب وطريقٌ إلى المحبة واليقين.</p>
      </div>

      <div className={styles.mediaSection}>
        {videoId ? (
          <div className={styles.videoFrame}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
              title={`شرح اسم الله ${item.name}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <div className={styles.videoUnavailable}>
            <span className={styles.youtubeIcon}>▶</span>
            <div><b>الفيديو الخاص بهذا الاسم لم يُنشر بعد</b><p>يمكنك متابعة قناة «الله أنيس المحبين» لمشاهدة أحدث حلقات السلسلة.</p></div>
            <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer">زيارة القناة ←</a>
          </div>
        )}

        <div className={styles.downloads} aria-label="تحميل محتوى المقال">
          <a href="/images/17104.pdf" download><span>↓</span><b>PDF</b><small>تحميل الكتاب</small></a>
          <div aria-disabled="true"><span>↓</span><b>DOCX</b><small>قريبًا</small></div>
          <div aria-disabled="true"><span>↓</span><b>MP3</b><small>قريبًا</small></div>
        </div>
      </div>

      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.dropCap}>{item.name.charAt(0)}</div>
          <p>{item.reflection}</p>

          <h3>المعنى الذي يحيي القلب</h3>
          <p>
            اسم الله <b><DivineNameText name={item.name} /></b> يدل على أنه سبحانه {item.meaning}. وكلما استقر هذا المعنى في القلب، ازداد العبد معرفةً بربه، وحسنًا في ظنه به، وصدقًا في الإقبال عليه.
          </p>

          <blockquote>
            <span><OrnamentIcon /></span>
            <p>{item.impact}</p>
          </blockquote>

          <h3>كيف نتعبّد لله بهذا الاسم؟</h3>
          <p>
            نتعبّد لله بهذا الاسم باستحضار معناه في الدعاء والذكر والعمل، وأن يظهر أثره في تعاملنا مع أنفسنا ومن حولنا. فالمعرفة الصادقة تُثمر عملًا، والعمل يزيد القلب قربًا وأنسًا بالله.
          </p>

          <h3>دعاء وتضرّع</h3>
          <p>
            يا <DivineNameText name={item.name} />، نسألك أن تملأ قلوبنا بمعرفتك ومحبتك، وأن ترزقنا صدق التوكل عليك، وحسن الظن بك، ولذة القرب منك، وأن تجعل هذا الاسم نورًا في قلوبنا وحياتنا.
          </p>
        </article>

        <aside className={styles.sideNote}>
          <span>وردك اليومي</span>
          <b>يا <DivineNameText name={item.name} /></b>
          <p>ردّد الاسم بقلب حاضر، واستشعر معناه وأثره في دعائك.</p>
        </aside>
      </div>

    </section>
  );
}
