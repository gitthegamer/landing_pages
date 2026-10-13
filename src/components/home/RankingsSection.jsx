import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TPS_RANKINGS } from "../../data/tpsContent";

export default function RankingsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openRanking = (category) => {
    navigate(`/rankings?cat=${category}`);
  };

  return (
    <section className="rankings" id="rankings">
      <div className="wrap">
        <div className="rank-grid">
          {TPS_RANKINGS.map((item) => (
            <article key={item.category} className="card">
              <div className="card-image">
                <img src={item.image} alt={item.alt} />
              </div>
              <div className="card-body">
                <h3>{t(item.titleKey)}</h3>
                <p>{t(item.descKey)}</p>
                <button
                  type="button"
                  className="outline"
                  onClick={() => openRanking(item.category)}
                >
                  {t("tps.rank.view")}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
