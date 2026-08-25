import React, { useState } from "react";
import navigate from "../action/navigate";
import { TPS_FOOTER } from "../../data/tpsContent";

export default function SiteFooter() {
  const [email, setEmail] = useState("");

  const handleNav = (e, href) => {
    if (href?.startsWith("#") && href.length > 1) {
      e.preventDefault();
      navigate(href);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer id="about">
      <div className="wrap">
        <div className="footgrid">
          <div>
            <div className="footbrand">
              THE
              <br />
              PLAY STANDARD
            </div>
            <p>
              Independent. Transparent.
              <br />
              Player-powered.
            </p>
          </div>
          <div>
            <h5>RANKINGS</h5>
            {TPS_FOOTER.rankings.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h5>INFORMATION</h5>
            {TPS_FOOTER.information.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div id="responsible">
            <h5>LEGAL</h5>
            {TPS_FOOTER.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h5>STAY UPDATED</h5>
            <p>Get monthly ranking updates and platform insights.</p>
            <form className="email" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
              <button type="submit">→</button>
            </form>
          </div>
        </div>
        <div className="copyright">
          © 2026 The Play Standard · Demo Website for Preview Purposes Only
        </div>
      </div>
    </footer>
  );
}
