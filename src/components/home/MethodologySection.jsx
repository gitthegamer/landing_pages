import React from "react";
import { TPS_STEPS } from "../../data/tpsContent";

export default function MethodologySection() {
  return (
    <section className="how" id="methodology">
      <img
        className="how-photo left"
        src="/assets/image/tps/how-left.jpg"
        alt="Casino detail"
      />
      <img
        className="how-photo right"
        src="/assets/image/tps/how-right.jpg"
        alt="Casino detail"
      />
      <div className="how-fade" />
      <div className="wrap">
        <h3 className="section-title">— HOW TPS WORKS —</h3>
        <div className="steps">
          {TPS_STEPS.map((step) => (
            <div key={step.num} className="step">
              <div className="circle">{step.icon}</div>
              <div>
                <b>{step.num}</b>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="method">
          <a href="#">LEARN MORE ABOUT METHODOLOGY →</a>
        </div>
      </div>
    </section>
  );
}
