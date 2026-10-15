"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Mountain,
  Flag,
  MapPin,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { campaign, funding, currency } from "@/data/campaign";
import { ExplorationMap } from "./exploration-map";

const links = [
  ["About", "about"],
  ["The land fund", "land-fund"],
  ["Updates", "updates"],
  ["Ledger", "ledger"],
  ["FAQ", "faq"],
];
function Seal({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "brand-icon" : "seal"}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" strokeWidth="1" />
      <circle cx="50" cy="50" r="38" strokeDasharray="1 4" />
      <path d="M23 60L39 36L53 54L62 42L78 64H23ZM31 71H69M50 19V27M50 76V82M17 50H23M77 50H83" />
      <path d="M42 60L50 51L61 64M37 40L41 46L44 43" />
      <circle cx="64" cy="31" r="3" />
    </svg>
  );
}
function ContributionDialog({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  const [amount, setAmount] = useState<number | "other">(25);
  const [custom, setCustom] = useState("");
  const [publicName, setPublicName] = useState(false);
  return (
    <dialog
      ref={dialogRef}
      className="contribution-dialog"
      aria-labelledby="contribution-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
      onClose={() => {
        document.body.style.overflow = "";
      }}
    >
      <div className="dialog-inner">
        <div className="section-heading">
          <span className="mono">Department of future acquisitions</span>
          <button
            className="icon-button"
            aria-label="Close contribution dialog"
            onClick={() => dialogRef.current?.close()}
          >
            <X />
          </button>
        </div>
        <h2 id="contribution-title">
          A little support.
          <br />A little more dirt.
        </h2>
        <p className="serif">
          A voluntary contribution toward one person’s future land purchase.
        </p>
        <fieldset>
          <legend className="mono">01 / Select an amount (USD)</legend>
          <div className="amounts">
            {campaign.amounts.map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                aria-pressed={amount === value}
              >
                {currency(value)}
              </button>
            ))}
            <button
              aria-pressed={amount === "other"}
              onClick={() => setAmount("other")}
            >
              Other
            </button>
          </div>
          {amount === "other" && (
            <label className="custom-amount">
              Custom amount (USD)
              <input
                type="number"
                min="1"
                step="0.01"
                inputMode="decimal"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="25.00"
              />
            </label>
          )}
        </fieldset>
        <fieldset>
          <legend className="mono">02 / Public recognition (optional)</legend>
          <label className="check-label">
            <input
              type="checkbox"
              checked={publicName}
              onChange={(e) => setPublicName(e.target.checked)}
            />{" "}
            Use a public display name
          </label>
          {publicName && (
            <label className="custom-amount">
              Display name
              <input
                type="text"
                maxLength={60}
                placeholder="Your preferred name"
                autoComplete="off"
              />
            </label>
          )}
          <p className="fine-print">
            Preview only. Your selections and name are not submitted or saved.
          </p>
        </fieldset>
        <div className="disclaimer">
          <strong>No land rights are included.</strong>
          <p>
            Voluntary financial support only. No equity, title, mineral rights,
            ownership rights, or financial interest. This is not a charity or
            collective ownership project.
          </p>
        </div>
        <button className="button disabled-checkout" disabled>
          Checkout not connected <ArrowRight size={18} />
        </button>
        <p className="fine-print">
          Secure checkout is not configured. No payments are processed and no
          contribution will be recorded.
        </p>
      </div>
    </dialog>
  );
}
function OfficialUpdates() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="updates" id="updates">
      <div className="section-heading">
        <h2>Official updates</h2>
        <span className="mono">Dispatches / 0{campaign.updates.length}</span>
      </div>
      <div id="update-list">
        {campaign.updates.slice(0, expanded ? undefined : 2).map((update) => (
          <article className="update" key={update.id}>
            <small className="mono">
              <i />
              {update.category} / {update.id}
            </small>
            <h3>{update.title}</h3>
            <p>{update.body}</p>
          </article>
        ))}
      </div>
      <button
        className="text-link"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="update-list"
      >
        {expanded ? "Show fewer updates" : "View all updates"}{" "}
        <ArrowRight size={15} />
      </button>
    </section>
  );
}
function ContributionLedger() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="ledger" id="ledger">
      <div className="section-heading">
        <h2>Recent contributions</h2>
        <Plus size={15} />
      </div>
      <small className="mono">
        {campaign.demoMode
          ? "Sample entries / demo data"
          : "Public record / awaiting first entry"}
      </small>
      <div className="ledger-head mono">
        <span>Supporter</span>
        <span>Amount</span>
      </div>
      {funding.contributions.length ? (
        funding.contributions
          .slice(0, expanded ? undefined : 2)
          .map((entry) => (
            <div className="ledger-entry" key={entry.id}>
              <div>
                {entry.name}
                <small>
                  {entry.date} · {entry.note}
                </small>
              </div>
              <strong>{currency(entry.amount)}</strong>
            </div>
          ))
      ) : (
        <div className="ledger-empty">
          <span className="empty-mark">—</span>
          <h3>No contributions recorded.</h3>
          <p>
            Every great land fund starts somewhere.
            <br />
            This one starts here.
          </p>
        </div>
      )}
      <button
        className="text-link"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="ledger-details"
      >
        {expanded ? "Close full ledger" : "View full ledger"}
        <ArrowRight size={15} />
      </button>
      {expanded && (
        <div id="ledger-details" className="ledger-details">
          <strong>
            {campaign.demoMode ? "Sample ledger" : "Complete public ledger"}
          </strong>
          <p>
            {funding.contributions.length
              ? `${funding.contributions.length} visible entries. ${campaign.demoMode ? "These are fictional examples, not transactions." : ""}`
              : "0 entries. Verified contribution data is not connected. No payments are currently accepted."}
          </p>
        </div>
      )}
    </section>
  );
}
export function ManifestDirt() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const contribute = () => {
    setMenuOpen(false);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#" className="brand" aria-label="Manifest Dirt home">
          <Seal small />
          <span>
            Manifest
            <br />
            Dirt
          </span>
        </a>
        <p className="header-tag mono">
          A general fund for future
          <br />
          territorial advancement.
        </p>
        <nav
          className={menuOpen ? "navigation open" : "navigation"}
          id="main-navigation"
          aria-label="Main navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setMenuOpen(false);
              document.getElementById("menu-toggle")?.focus();
            }
          }}
        >
          {links.map(([name, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              {name}
            </a>
          ))}
        </nav>
        <button className="button header-contribute" onClick={contribute}>
          Contribute <ArrowUpRight size={17} />
        </button>
        <span className="header-end mono">
          Land later.
          <br />
          For a brighter tomorrow.
        </span>
        <button
          id="menu-toggle"
          className="menu-toggle icon-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">
        {campaign.demoMode && (
          <div className="demo-banner mono">
            Demo data — all financial figures and ledger entries are
            illustrative.
          </div>
        )}
        <div className="hero-grid">
          <section className="hero-declaration" id="about">
            <p className="eyebrow mono">{campaign.eyebrow}</p>
            <h1>
              <span>Manifest</span>
              <span>
                Dirt
                <span className="headline-cross" aria-hidden="true">
                  ✳
                </span>
              </span>
            </h1>
            <div className="hero-intro">
              <span className="mono document-id">
                Est. someday
                <br />
                Oklahoma, USA
              </span>
              <h2>{campaign.declaration}</h2>
            </div>
            <p className="hero-description serif">{campaign.introduction}</p>
            <button className="button hero-cta" onClick={contribute}>
              Contribute to the land fund <ArrowRight size={22} />
            </button>
            <div className="hero-values">
              <span>
                <Mountain />
                <small>
                  Real land
                  <br />
                  (someday)
                </small>
              </span>
              <span>
                <Flag />
                <small>
                  A more uncertain
                  <br />
                  tomorrow
                </small>
              </span>
              <span>
                <MapPin />
                <small>
                  Publicly funded.
                  <br />
                  Not yet located.
                </small>
              </span>
            </div>
          </section>
          <div className="map-column" id="land-fund">
            <ExplorationMap />
            <section className="stats" aria-label="Land fund statistics">
              {[
                ["Fund balance", currency(funding.balance)],
                ["Goal", funding.goal ? currency(funding.goal) : "Goal TBD"],
                ["Supporters", funding.supporters.toLocaleString("en-US")],
                ["Prospective acreage", campaign.acreage],
                ["Region of interest", campaign.region],
              ].map(([label, value]) => (
                <div key={label}>
                  <small className="mono">{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </section>
          </div>
        </div>
        <div className="editorial-grid">
          <figure className="landscape-photo">
            <Image
              src="/images/oklahoma-landscape.png"
              alt="Illustrative black-and-white prairie landscape with rolling hills; not an identified parcel"
              fill
              sizes="(max-width: 700px) 100vw, 33vw"
            />
            <figcaption>
              <span className="mono">Field notes / no fixed address</span>
              <strong>
                Different land.
                <br />
                Same ideas.
              </strong>
              <span className="mono">Illustrative landscape</span>
            </figcaption>
          </figure>
          <section className="quote-panel">
            <small className="mono">A statement of intent</small>
            <p>
              Land eventually
              <br />
              belongs to
              <br />
              everyone.
              <br />
              <em>Especially us.</em>
            </p>
            <span className="mono">An ambition. Not an ownership offer. ↗</span>
          </section>
          <OfficialUpdates />
          <ContributionLedger />
          <figure className="windmill-photo">
            <Image
              src="/images/prairie-windmill.png"
              alt="Illustrative prairie windmill beneath a wide sky; not a selected property"
              fill
              sizes="(max-width: 700px) 100vw, 42vw"
            />
            <figcaption className="mono">
              Somewhere in Oklahoma. Maybe.
              <br />
              Probably not yet.<span>Illustrative landscape / 02</span>
            </figcaption>
          </figure>
          <section className="closing-panel">
            <span className="mono">
              Manifest Dirt
              <br />
              Bureau of eventual land
            </span>
            <Seal />
            <h2>
              A brighter
              <br />
              tomorrow
              <br />
              requires
              <br />
              more dirt.
            </h2>
            <span className="mono">Terra firma. Eventually.</span>
          </section>
        </div>
        <section className="faq-section" id="faq">
          <div>
            <span className="mono">Before you stake a claim</span>
            <h2>
              Some ground
              <br />
              rules.
            </h2>
            <p className="serif">A few things worth clearing up.</p>
          </div>
          <div className="faq-list">
            {campaign.faqs.map(([question, answer], i) => (
              <details key={question}>
                <summary>
                  <span className="mono">0{i + 1}</span>
                  {question}
                  <Plus size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="brand" href="#">
          <Seal small />
          <span>
            Manifest
            <br />
            Dirt
          </span>
        </a>
        <p>
          {campaign.disclosure}
          <br />
          No parcel selected. No payments currently accepted.
        </p>
        <span className="mono">
          Oklahoma, eventually.
          <br />
          Land later. © {new Date().getFullYear()} Manifest Dirt
        </span>
      </footer>
      <ContributionDialog dialogRef={dialogRef} />
    </>
  );
}
