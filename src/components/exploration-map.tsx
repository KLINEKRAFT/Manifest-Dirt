"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { campaign, fundingPercent } from "@/data/campaign";

function Contours() {
  return (
    <svg
      className="contours"
      viewBox="0 0 900 650"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="75" height="75" patternUnits="userSpaceOnUse">
          <path
            d="M75 0H0V75"
            fill="none"
            stroke="currentColor"
            strokeWidth=".5"
          />
        </pattern>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="900" height="650" fill="url(#grid)" />
      <g
        className="terrain-lines"
        fill="none"
        stroke="currentColor"
        strokeWidth=".7"
      >
        {Array.from({ length: 32 }, (_, i) => (
          <path
            key={i}
            d={`M${-200 + i * 15} -30 C${30 + i * 20} ${150 + i * 3},${500 - i * 9} ${80 + i * 9},${410 + i * 12} ${260 + i * 7} S${170 + i * 12} ${460 - i * 5},${350 + i * 14} 700`}
          />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <ellipse
            key={i}
            cx="750"
            cy="430"
            rx={35 + i * 22}
            ry={25 + i * 16}
            transform="rotate(-28 750 430)"
          />
        ))}
      </g>
      <g
        className="survey-lines"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path
          d="M80 100L720 540M120 540L760 120M230 0V650M620 0V650M0 280H900M0 480H900"
          strokeDasharray="4 7"
        />
        <path
          d="M135 165L325 125L380 355L175 400ZM475 305L680 250L740 470L540 535Z"
          fill="currentColor"
          fillOpacity=".04"
        />
      </g>
      <g stroke="currentColor" opacity=".7">
        {Array.from({ length: 40 }, (_, i) => {
          const x = 55 + (i % 8) * 110;
          const y = 50 + Math.floor(i / 8) * 130;
          return <path key={i} d={`M${x - 4} ${y}h8M${x} ${y - 4}v8`} />;
        })}
      </g>
      <rect width="900" height="650" filter="url(#grain)" opacity=".035" />
    </svg>
  );
}
export function ExplorationMap() {
  const [mode, setMode] = useState<"terrain" | "survey">("terrain");
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section
      className={`exploration ${mode}`}
      aria-label="Illustrative exploration map"
    >
      <Contours />
      <div className="map-top mono">
        <span>
          Oklahoma / field of possibility
          <br />
          <span className="muted">Survey document — 001</span>
        </span>
        <span>
          Exploration: ongoing
          <br />
          Location: undetermined
        </span>
      </div>
      <div className="compass" aria-hidden="true">
        <span>N</span>
        <svg viewBox="0 0 40 60">
          <path d="M20 5L31 47L20 37L9 47Z" fill="none" stroke="currentColor" />
          <path d="M20 5V37L9 47Z" fill="currentColor" />
        </svg>
      </div>
      <span className="map-watermark" aria-hidden="true">
        OKLAHOMA
      </span>
      {campaign.landTypes.map((land, i) => (
        <button
          key={land.label}
          className={`land-card land-${i}`}
          onClick={() => setSelected(selected === i ? null : i)}
          aria-expanded={selected === i}
          aria-controls="land-information"
        >
          <Image src={land.image} alt="" width={160} height={70} />
          <span className="land-copy">
            <small className="mono">
              {land.label} <ArrowUpRight size={12} />
            </small>
            <strong>{land.title}</strong>
            <small className="mono">Illustrative / explore +</small>
          </span>
        </button>
      ))}
      <div className="funding-ring">
        <svg viewBox="0 0 140 140" aria-hidden="true">
          <circle
            cx="70"
            cy="70"
            r="61"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".25"
            strokeWidth="2"
          />
          <circle
            cx="70"
            cy="70"
            r="61"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="4"
            pathLength="100"
            strokeDasharray={`${fundingPercent ?? 0} 100`}
            transform="rotate(-90 70 70)"
          />
        </svg>
        <div>
          <small className="mono">Acquisition fund</small>
          <strong>
            {fundingPercent === null ? "TBD" : `${Math.round(fundingPercent)}%`}
          </strong>
          <small className="mono">
            {fundingPercent === null ? "Goal pending" : "of funding goal"}
          </small>
        </div>
      </div>
      <div className="map-bottom">
        <div className="mode-switch" aria-label="Map view">
          {(["terrain", "survey"] as const).map((value) => (
            <button
              key={value}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <span className="mono">
          <Plus size={12} /> Illustrative survey
          <br />
          Not a property map
        </span>
      </div>
      {selected !== null && (
        <div
          id="land-information"
          className="land-detail"
          role="region"
          aria-label={campaign.landTypes[selected].title}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelected(null);
          }}
        >
          <button
            className="close"
            aria-label="Close land information"
            onClick={() => setSelected(null)}
          >
            <X size={18} />
          </button>
          <small className="mono">
            {campaign.landTypes[selected].label} / illustrative
          </small>
          <h3>{campaign.landTypes[selected].title}</h3>
          <p>{campaign.landTypes[selected].description}</p>
        </div>
      )}
    </section>
  );
}
