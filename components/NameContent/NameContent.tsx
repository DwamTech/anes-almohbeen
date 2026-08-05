import type { ReactNode } from "react";
import type { DivineName } from "@/data/names";
import { nameArticlesBySlug } from "@/data/nameArticles";
import { youtubeChannelUrl, youtubeVideosByName } from "@/data/youtubeVideos";
import DivineNameText from "@/components/DivineNameText/DivineNameText";
import styles from "./NameContent.module.css";

const quranMarksPattern = /[\u0670\u0671\u06d6-\u06ed]/;
const arabicDiacriticsPattern = /[\u064b-\u065f]/g;

function isQuranVerse(text: string) {
  if (quranMarksPattern.test(text)) return true;
  return (text.match(arabicDiacriticsPattern)?.length ?? 0) >= 4;
}

function QuranAwareText({ text }: { text: string }) {
  const content: ReactNode[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const openingIndex = text.indexOf("(", cursor);

    if (openingIndex === -1) {
      content.push(text.slice(cursor));
      break;
    }

    let depth = 0;
    let closingIndex = -1;

    for (let index = openingIndex; index < text.length; index += 1) {
      if (text[index] === "(") depth += 1;
      if (text[index] === ")") depth -= 1;

      if (depth === 0) {
        closingIndex = index;
        break;
      }
    }

    if (closingIndex === -1) {
      content.push(text.slice(cursor));
      break;
    }

    if (openingIndex > cursor) {
      content.push(text.slice(cursor, openingIndex));
    }

    const parentheticalText = text.slice(openingIndex, closingIndex + 1);
    content.push(
      isQuranVerse(parentheticalText) ? (
        <span className={styles.quranVerse} key={`${openingIndex}-${closingIndex}`}>
          {parentheticalText}
        </span>
      ) : (
        parentheticalText
      ),
    );

    cursor = closingIndex + 1;
  }

  return content;
}

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
                {paragraph.title ? <h2><QuranAwareText text={paragraph.title} /></h2> : null}
                <div className={styles.paragraphContent}>
                  {paragraph.content.map((content, index) =>
                    content ? <p key={index}><QuranAwareText text={content} /></p> : null,
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
