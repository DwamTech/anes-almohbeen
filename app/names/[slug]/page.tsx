import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DivineNameText from "@/components/DivineNameText/DivineNameText";
import Footer from "@/components/Footer/Footer";
import FooterEngagement from "@/components/FooterEngagement/FooterEngagement";
import Header from "@/components/Header/Header";
import NameContent from "@/components/NameContent/NameContent";
import { divineNames, getDivineName } from "@/data/names";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return divineNames.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getDivineName((await params).slug);
  return {
    title: item?.name ?? "الاسم غير موجود",
    description: item?.meaning,
  };
}

export default async function NamePage({ params }: Props) {
  const item = getDivineName((await params).slug);
  if (!item) notFound();

  const previous = divineNames[item.id - 2];
  const next = divineNames[item.id];

  return (
    <main className="site-shell">
      <Header />

      <section className={styles.detail}>
        <div className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label="مسار الصفحة">
            <Link href="/">الرئيسية</Link>
            <span>•</span>
            <Link href="/#names">الأسماء الحسنى</Link>
            <span>•</span>
            <b>
              <DivineNameText name={item.name} />
            </b>
          </nav>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.copy}>
            <span className={styles.label}>مِنْ أَسْمَاءِ اللهِ الحُسْنَى</span>
            <h1>
              <DivineNameText name={item.name} />
            </h1>
            <h2>{item.meaning}</h2>
            <p>{item.reflection}</p>
          </div>
        </div>

        <div className="page-container">
          <NameContent item={item} />

          <div className={styles.navNames}>
            {previous ? (
              <Link href={`/names/${previous.slug}`}>
                <span>→ الاسم السابق</span>
                <b>
                  <DivineNameText name={previous.name} />
                </b>
              </Link>
            ) : (
              <span />
            )}

            <Link className={styles.all} href="/#names">
              كل الأسماء <i>⊞</i>
            </Link>

            {next ? (
              <Link href={`/names/${next.slug}`}>
                <span>الاسم التالي ←</span>
                <b>
                  <DivineNameText name={next.name} />
                </b>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>

      <FooterEngagement />
      <Footer />
    </main>
  );
}
