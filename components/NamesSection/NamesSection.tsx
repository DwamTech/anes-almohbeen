"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DivineNameText from "@/components/DivineNameText/DivineNameText";
import { divineNames } from "@/data/names";
import styles from "./NamesSection.module.css";

export default function NamesSection() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      divineNames.filter((item) =>
        `${item.name} ${item.meaning}`.includes(query.trim()),
      ),
    [query],
  );

  return (
    <section className={styles.section} id="names">
      <div className="page-container">
        <div className={styles.heading}>
          <div>
            <span>تعرّف إلى ربك</span>
            <h2 className={styles.srOnly}>أسماء الله الحسنى</h2>
            <Image
              className={styles.asmaaTitle}
              src="/images/asmaa.png"
              alt="أسماء الله الحسنى"
              width={754}
              height={277}
              sizes="(max-width: 680px) 72vw, 330px"
            />
            <p>اختر اسمًا لتتأمل معناه وأثره في قلبك وحياتك.</p>
          </div>

          <label className={styles.search}>
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن اسم أو معنى..."
              aria-label="البحث في الأسماء"
            />
          </label>
        </div>

        <div className={styles.grid}>
          {filtered.map((item) => (
            <Link
              href={`/names/${item.slug}`}
              className={`${styles.card} ${
                !query.trim() && item.id > 96 ? styles.lastCard : ""
              }`}
              key={item.id}
            >
              <h3>
                <DivineNameText name={item.name} />
              </h3>
            </Link>
          ))}
        </div>

        {!filtered.length && (
          <p className={styles.empty}>لم نجد اسمًا مطابقًا لبحثك.</p>
        )}
      </div>
    </section>
  );
}
