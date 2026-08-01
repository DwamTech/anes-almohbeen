"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { divineNames } from "@/data/names";
import styles from "./NamesSection.module.css";

export default function NamesSection() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => divineNames.filter((item) => `${item.name} ${item.meaning}`.includes(query.trim())), [query]);
  return (
    <section className={styles.section} id="names">
      <div className="page-container">
        <div className={styles.heading}>
          <div><span>تعرّف إلى ربك</span><h2>أسماء الله الحسنى</h2><p>اختر اسمًا لتتأمل معناه وأثره في قلبك وحياتك.</p></div>
          <label className={styles.search}><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن اسم أو معنى..." aria-label="البحث في الأسماء"/></label>
        </div>
        <div className={styles.grid}>
          {filtered.map((item) => (
            <Link href={`/names/${item.slug}`} className={styles.card} key={item.id}>
              <span className={styles.number}>{String(item.id).padStart(2, "0")}</span>
              <div className={styles.icon}>✦</div>
              <h3>{item.name}</h3><p>{item.meaning}</p>
              <span className={styles.more}>تأمّل الاسم <b>←</b></span>
            </Link>
          ))}
        </div>
        {!filtered.length && <p className={styles.empty}>لم نجد اسمًا مطابقًا لبحثك.</p>}
      </div>
    </section>
  );
}
