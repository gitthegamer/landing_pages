import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TPS_SPONSORS } from "../../data/tpsContent";

function SponsorCard({ sponsor }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="sponsor-card">
      <span className="sponsor-adtag">AD</span>
      {!failed && (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          onError={() => setFailed(true)}
        />
      )}
      <span
        className={`sponsor-word ${sponsor.wordClass}`.trim()}
        style={{ display: failed ? "block" : "none" }}
      >
        {sponsor.name}
      </span>
    </div>
  );
}

export default function SponsorBar() {
  const { t } = useTranslation();
  const track = [...TPS_SPONSORS, ...TPS_SPONSORS];

  return (
    <section className="sponsor-bar" aria-label="Featured brand partners">
      <div className="sponsor-shell">
        <div className="sponsor-label">
          <b>{t("tps.sponsor.featured")}</b>
          <span>{t("tps.sponsor.showcase")}</span>
        </div>
        <div className="sponsor-window">
          <div className="sponsor-track">
            {track.map((sponsor, index) => (
              <SponsorCard
                key={`${sponsor.name}-${index}`}
                sponsor={sponsor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
