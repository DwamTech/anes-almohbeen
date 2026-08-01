import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import NamesSection from "@/components/NamesSection/NamesSection";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import FooterEngagement from "@/components/FooterEngagement/FooterEngagement";

export default function Home() {
  return <main className="site-shell"><Header/><Hero/><NamesSection/><About/><FooterEngagement/><Footer/></main>;
}
