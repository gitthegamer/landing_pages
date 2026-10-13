import { Page } from "framework7-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import SponsorBar from "../components/home/SponsorBar";
import SiteFooter from "../components/home/SiteFooter";
import { TPS_CATEGORIES } from "../data/tpsContent";

const VALID = new Set(TPS_CATEGORIES.map((item) => item.id));

export default function LiveDataPage() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const raw = params.get("cat") || "popular";
  const cat = VALID.has(raw) ? raw : "popular";

  return (
    <Page className="tps-page" pageContent={false}>
      <div className="tps-site">
        <Header />
        <SponsorBar />
        <section className="tps-v2page active">
          <div className="wrap">
            <div className="tps-v2-k">{t("tps.live.kicker")}</div>
            <h1 className="tps-v2-h">{t("tps.live.title")}</h1>
            <p className="tps-v2-p">{t("tps.live.desc")}</p>
            <div className="tps-v2-metrics">
              <div className="tps-v2-metric">
                <small>{t("tps.live.total")}</small>
                <b>0</b>
              </div>
              <div className="tps-v2-metric">
                <small>{t("tps.live.today")}</small>
                <b>0</b>
              </div>
              <div className="tps-v2-metric">
                <small>{t("tps.live.platforms")}</small>
                <b>0</b>
              </div>
            </div>
            <div className="tps-v2-tabs">
              {TPS_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`tps-v2-tab${item.id === cat ? " active" : ""}`}
                  onClick={() => setParams({ cat: item.id })}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
            <div className="tps-v2-table">
              <div className="tps-v2-row tps-v2-head is-live">
                <div>{t("tps.live.colRank")}</div>
                <div>{t("tps.live.colPlatform")}</div>
                <div>{t("tps.live.colVotes")}</div>
                <div>{t("tps.live.colShare")}</div>
                <div>{t("tps.live.colChange")}</div>
              </div>
              <div className="tps-empty-ranking">{t("tps.rank.empty")}</div>
            </div>
            <div className="tps-v2-note">
              <b>{t("tps.live.noteTitle")}</b> {t("tps.live.noteBody")}
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </Page>
  );
}
