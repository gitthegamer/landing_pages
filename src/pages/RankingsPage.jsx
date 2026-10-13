import { Page } from "framework7-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import SponsorBar from "../components/home/SponsorBar";
import SiteFooter from "../components/home/SiteFooter";
import { TPS_CATEGORIES } from "../data/tpsContent";

const VALID = new Set(TPS_CATEGORIES.map((item) => item.id));

export default function RankingsPage() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const raw = params.get("cat") || "popular";
  const cat = VALID.has(raw) ? raw : "popular";

  const selectCat = (id) => {
    setParams({ cat: id });
  };

  return (
    <Page className="tps-page" pageContent={false}>
      <div className="tps-site">
        <Header />
        <SponsorBar />
        <section className="tps-v2page active">
          <div className="wrap">
            <div className="tps-v2-k">{t("tps.rank.kicker")}</div>
            <h1 className="tps-v2-h">{t("tps.rank.pageTitle")}</h1>
            <p className="tps-v2-p">{t("tps.rank.pageDesc")}</p>
            <div className="tps-v2-pills">
              <span className="tps-v2-pill">{t("tps.rank.pillOpen")}</span>
              <span className="tps-v2-pill">
                {t("tps.rank.pillProvisional")}
              </span>
              <span className="tps-v2-pill">{t("tps.rank.pillUpdated")}</span>
            </div>
            <div className="tps-v2-tabs">
              {TPS_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`tps-v2-tab${item.id === cat ? " active" : ""}`}
                  onClick={() => selectCat(item.id)}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
            <div className="tps-v2-table">
              <div className="tps-v2-row tps-v2-head">
                <div>{t("tps.rank.colRank")}</div>
                <div>{t("tps.rank.colPlatform")}</div>
                <div>{t("tps.rank.colVotes")}</div>
                <div>{t("tps.rank.colChange")}</div>
              </div>
              <div className="tps-empty-ranking">{t("tps.rank.empty")}</div>
            </div>
            <div className="tps-v2-note">
              <b>{t("tps.rank.noteTitle")}</b> {t("tps.rank.noteBody")}
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </Page>
  );
}
