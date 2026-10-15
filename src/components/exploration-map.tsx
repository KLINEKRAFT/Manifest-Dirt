"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { campaign, fundingPercent } from "@/data/campaign";

// A deterministic imaginary elevation field: contours describe continuous
// ridges and valleys, never real coordinates or identified properties.
function elevation(x: number, y: number) {
  return (
    25 * Math.sin(x / 170 + Math.sin(y / 190)) +
    19 * Math.cos(y / 140 - x / 390) +
    9 * Math.sin(x / 67 + y / 99) +
    4 * Math.cos(y / 32 - x / 55) +
    2 * Math.sin(x / 19 + Math.cos(y / 29))
  );
}
function makeContours() {
  const step = 9;
  const columns = 100;
  const rows = 73;
  const field = Array.from({ length: rows + 1 }, (_, y) =>
    Array.from({ length: columns + 1 }, (_, x) =>
      elevation(x * step, y * step),
    ),
  );
  return Array.from({ length: 30 }, (_, level) => {
    const height = -58 + level * 4;
    let path = "";
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < columns; x++) {
        const vertices = [
          [x * step, y * step],
          [(x + 1) * step, y * step],
          [(x + 1) * step, (y + 1) * step],
          [x * step, (y + 1) * step],
        ];
        const values = [
          field[y][x],
          field[y][x + 1],
          field[y + 1][x + 1],
          field[y + 1][x],
        ];
        const crossings: number[][] = [];
        for (let edge = 0; edge < 4; edge++) {
          const next = (edge + 1) % 4;
          if (values[edge] < height !== values[next] < height) {
            const t = (height - values[edge]) / (values[next] - values[edge]);
            crossings.push([
              vertices[edge][0] + t * (vertices[next][0] - vertices[edge][0]),
              vertices[edge][1] + t * (vertices[next][1] - vertices[edge][1]),
            ]);
          }
        }
        for (let i = 0; i + 1 < crossings.length; i += 2) {
          path += `M${crossings[i][0].toFixed(1)},${crossings[i][1].toFixed(1)}L${crossings[i + 1][0].toFixed(1)},${crossings[i + 1][1].toFixed(1)}`;
        }
      }
    return { path, major: level % 5 === 0 };
  });
}
const terrainContours = makeContours();
function Contours() {
  return (
    <svg
      className="contours"
      viewBox="0 0 900 650"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="survey-grid"
          width="90"
          height="90"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M90 0H0V90"
            fill="none"
            stroke="currentColor"
            strokeWidth=".65"
          />
          <path
            d="M42 45H48M45 42V48"
            stroke="currentColor"
            strokeWidth=".75"
          />
        </pattern>
        <filter id="paper-relief" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".018 .025"
            numOctaves="3"
            seed="12"
          />
          <feDiffuseLighting
            surfaceScale="4"
            diffuseConstant=".7"
            lightingColor="#bcc4a0"
          >
            <feDistantLight azimuth="235" elevation="42" />
          </feDiffuseLighting>
          <feBlend in="SourceGraphic" mode="soft-light" />
        </filter>
        <filter id="map-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".7"
            numOctaves="3"
            seed="8"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect
        className="relief-surface"
        width="900"
        height="650"
        fill="#263b2e"
        filter="url(#paper-relief)"
      />
      <g className="terrain-lines" fill="none" stroke="#b5bd8d">
        {terrainContours.map(({ path, major }, i) => (
          <path
            key={i}
            d={path}
            strokeWidth={major ? 1.05 : 0.55}
            opacity={major ? 0.6 : 0.32}
          />
        ))}
      </g>
      <g
        className="survey-blocks"
        fill="#c3cbb1"
        stroke="#c3cbb1"
        strokeWidth=".65"
      >
        <path d="M90 90H270V270H90Z" fillOpacity=".045" />
        <path d="M360 180H540V360H360Z" fillOpacity=".07" />
        <path d="M180 360H360V540H180Z" fillOpacity=".045" />
        <path d="M630 360H810V540H630Z" fillOpacity=".035" />
      </g>
      <rect
        className="survey-grid"
        width="900"
        height="650"
        fill="url(#survey-grid)"
      />
      <g className="watercourse" fill="none" stroke="#b1c9ba">
        <path
          d="M610 -20C540 90 675 110 590 205S490 295 535 355S465 455 440 490S450 570 365 670"
          strokeWidth="4"
          opacity=".08"
        />
        <path
          d="M610 -20C540 90 675 110 590 205S490 295 535 355S465 455 440 490S450 570 365 670"
          strokeWidth=".8"
          opacity=".45"
        />
      </g>
      <g className="survey-lines" fill="none" stroke="#dedbc2">
        <path
          d="M0 324L180 324L285 255L440 255L535 180L900 180M360 650V510L480 420V90"
          strokeDasharray="3 6"
          strokeWidth="1"
        />
        <path
          d="M0 327L180 327L285 258L440 258L535 183L900 183"
          opacity=".2"
          strokeWidth=".6"
        />
      </g>
      <g
        className="survey-annotations"
        fill="currentColor"
        fontSize="7"
        letterSpacing="2"
      >
        <text x="32" y="315">
          CONCEPTUAL TRANSECT
        </text>
        <text x="550" y="385" transform="rotate(-90 550 385)">
          ILLUSTRATIVE DRAINAGE
        </text>
        <text x="642" y="346">
          UNDETERMINED TERRITORY
        </text>
      </g>
      <rect width="900" height="650" filter="url(#map-grain)" opacity=".055" />
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
      <div className="map-registration" aria-hidden="true">
        <span>+ A</span>
        <span>B +</span>
      </div>
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
          <span className="card-anchor" aria-hidden="true">
            <span />
          </span>
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
            r="68"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray=".7 4.64"
            opacity=".45"
          />
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
