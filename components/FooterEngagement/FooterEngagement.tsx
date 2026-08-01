"use client";

import { useEffect, useState } from "react";
import styles from "./FooterEngagement.module.css";

const BASE_VISITORS = 1477314;

export default function FooterEngagement() {
  const [visitors, setVisitors] = useState(BASE_VISITORS);

  useEffect(() => {
    const key = "allah-anees-first-visit";
    const isReturningVisitor = window.localStorage.getItem(key);
    if (!isReturningVisitor) window.localStorage.setItem(key, new Date().toISOString());
    setVisitors(BASE_VISITORS + (isReturningVisitor ? 0 : 1));
  }, []);

  const shareText = "الله أنيس المحبين — رحلة في رحاب أسماء الله الحسنى";

  function openShare(platform: "facebook" | "x" | "whatsapp" | "telegram" | "email") {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent(shareText);
    const destinations = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      email: `mailto:?subject=${text}&body=${text}%0A${url}`,
    };
    window.open(destinations[platform], "_blank", "noopener,noreferrer,width=720,height=620");
  }

  async function nativeShare() {
    const shareData = { title: shareText, text: shareText, url: window.location.origin };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(window.location.origin);
  }

  return (
    <section className={styles.section} aria-label="المشاركة وعدد الزائرين">
      <div className={`page-container ${styles.engagement}`}>
      <p className={styles.kicker}>انشر النور وشارك الأجر</p>
      <h2>ساهم في التعريف بأسماء الله الحسنى</h2>
      <div className={styles.shareButtons}>
        <button className={styles.facebook} onClick={() => openShare("facebook")} aria-label="مشاركة على فيسبوك">f</button>
        <button className={styles.x} onClick={() => openShare("x")} aria-label="مشاركة على منصة إكس">𝕏</button>
        <button className={styles.whatsapp} onClick={() => openShare("whatsapp")} aria-label="مشاركة عبر واتساب">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.7 9.7 0 0 0-8.3 14.7L2.4 21.6l5-1.3A9.7 9.7 0 1 0 12 2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.7Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2 0-.4-.1-.6.2l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5.2-.4c.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.7 2.6 4.1 3.6.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.2-.3-.2-.5-.3Z"/></svg>
        </button>
        <button className={styles.telegram} onClick={() => openShare("telegram")} aria-label="مشاركة عبر تليجرام">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20.7 3.5-3.1 16.2c-.2 1.1-.9 1.3-1.8.8l-4.7-3.5-2.3 2.2c-.2.3-.5.5-1 .5l.4-4.8 8.7-7.8c.4-.3-.1-.5-.6-.2L5.5 13.7.9 12.2c-1-.3-1-1 .2-1.5L19 3.8c.8-.3 1.6.2 1.7-.3Z"/></svg>
        </button>
        <button className={styles.email} onClick={() => openShare("email")} aria-label="مشاركة عبر البريد الإلكتروني">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 8 8.5-5.5H3.5L12 13Zm0 2.3L3 9.5V17h18V9.5l-9 5.8Z"/></svg>
        </button>
        <button className={styles.more} onClick={nativeShare} aria-label="خيارات مشاركة إضافية">+</button>
      </div>

      <div className={styles.visitors}>
        <span>أنت الزائر رقم</span>
        <strong>{new Intl.NumberFormat("en-US").format(visitors)}</strong>
      </div>
      </div>
    </section>
  );
}
