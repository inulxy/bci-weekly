import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import CompanyTracker from "@/components/CompanyTracker";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import {
  newsItems,
  companyTrackerData,
  currentWeekMeta,
} from "@/data/weekly-data";

export default function Home() {
  return (
    <div style={{ background: "#080E1A", minHeight: "100vh" }}>
      <Header />

      <HeroSection meta={currentWeekMeta} />

      {/* Company Tracker — full width section */}
      <CompanyTracker companies={companyTrackerData} />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="h-px"
          style={{ background: "rgba(29, 48, 80, 0.6)" }}
        />
      </div>

      {/* Main content: news feed + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
          {/* News feed — 2/3 */}
          <div className="lg:col-span-2">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-0.5 h-8 rounded-full"
                style={{ background: "#F5A624" }}
              />
              <div>
                <h2
                  className="font-display font-semibold"
                  style={{ fontSize: "1.1rem", color: "#E2EAF4" }}
                >
                  本周全部动态
                </h2>
                <p
                  className="font-mono text-xs mt-0.5"
                  style={{ color: "#3D566E" }}
                >
                  {currentWeekMeta.dateRange} · {newsItems.length} 条收录
                </p>
              </div>
            </div>
            <NewsFeed items={newsItems} />
          </div>

          {/* Sidebar — 1/3 */}
          <Sidebar items={newsItems} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
