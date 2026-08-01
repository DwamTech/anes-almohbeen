import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FooterEngagement from "@/components/FooterEngagement/FooterEngagement";
import NameContent from "@/components/NameContent/NameContent";
import { divineNames, getDivineName } from "@/data/names";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return divineNames.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getDivineName((await params).slug);
  return { title: item?.name ?? "الاسم غير موجود", description: item?.meaning };
}

export default async function NamePage({ params }: Props) {
  const item = getDivineName((await params).slug);
  if (!item) notFound();
  const previous = divineNames[item.id - 2];
  const next = divineNames[item.id];
  return <main className="site-shell"><Header/><section className={styles.detail}><div className="page-container">
    <div className={styles.breadcrumb}><Link href="/">الرئيسية</Link><span>•</span><Link href="/#names">الأسماء الحسنى</Link><span>•</span><b>{item.name}</b></div>
    <div className={styles.hero}>
      <div className={styles.orbit}><div className={styles.name}><small>{String(item.id).padStart(2,"0")}</small>{item.name}<span>جلّ جلاله</span></div></div>
      <div className={styles.copy}><span className={styles.label}>مِنْ أَسْمَاءِ اللهِ الحُسْنَى</span><h1>{item.name}</h1><h2>{item.meaning}</h2><p>{item.reflection}</p></div>
    </div>
    <NameContent item={item} />
    <div className={styles.navNames}>
      {previous ? <Link href={`/names/${previous.slug}`}><span>→ الاسم السابق</span><b>{previous.name}</b></Link> : <span/>}
      <Link className={styles.all} href="/#names">كل الأسماء <i>⊞</i></Link>
      {next ? <Link href={`/names/${next.slug}`}><span>الاسم التالي ←</span><b>{next.name}</b></Link> : <span/>}
    </div>
  </div></section><FooterEngagement/><Footer/></main>;
}
