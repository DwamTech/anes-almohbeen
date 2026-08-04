import type { DivineName } from "@/data/names";
import { nameArticlesBySlug } from "@/data/nameArticles";
import { youtubeChannelUrl, youtubeVideosByName } from "@/data/youtubeVideos";
import DivineNameText from "@/components/DivineNameText/DivineNameText";
import styles from "./NameContent.module.css";

export default function NameContent({ item }: { item: DivineName }) {
  const videoId = youtubeVideosByName[item.name];
  const article = nameArticlesBySlug[item.slug];
  const paragraphs = article?.paragraphs.filter(
    (paragraph) =>
      paragraph.title.trim() ||
      paragraph.content.some((content) => content.trim()),
  );

  return (
    <section className={styles.contentSection}>
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

        <div className={styles.downloads} aria-label="تحميل المحتوى">
          <a href="/images/17104.pdf" download>
            <span>↓</span><b>PDF</b><small>تحميل الكتاب</small>
          </a>
          <div aria-disabled="true">
            <span>↓</span><b>DOCX</b><small>قريبًا</small>
          </div>
          <div aria-disabled="true">
            <span>↓</span><b>MP3</b><small>قريبًا</small>
          </div>
        </div>
      </div>

      {paragraphs && paragraphs.length > 0 ? (
        <div className={styles.layout}>
          <article className={styles.article} aria-label={`مقال عن اسم الله ${item.name}`}>
            {paragraphs.map((paragraph) => (
              <section className={styles.paragraph} key={paragraph.id}>
                {paragraph.title ? <h2>{paragraph.title}</h2> : null}
                <div className={styles.paragraphContent}>
                  {paragraph.content.map((content, index) =>
                    content ? <p key={index}>{content}</p> : null,
                  )}
                </div>
              </section>
            ))}
          </article>

          <aside className={styles.sideNote}>
            <span>وردك اليومي</span>
            <b>يا <DivineNameText name={item.name} /></b>
            <p>ردّد الاسم بقلب حاضر، واستشعر معناه وأثره في دعائك.</p>
          </aside>
        </div>
      ) : (
        <aside className={`${styles.sideNote} ${styles.sideNoteSolo}`}>
          <span>وردك اليومي</span>
          <b>يا <DivineNameText name={item.name} /></b>
          <p>ردّد الاسم بقلب حاضر، واستشعر معناه وأثره في دعائك.</p>
        </aside>
      )}
    </section>
  );
}
