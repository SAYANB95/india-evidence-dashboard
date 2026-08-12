"use client";

import { useMemo, useState } from "react";
import { freedomEvents } from "../../lib/freedom-events";
import {
  cellularJailProvinceRecords,
  cellularJailSource,
  cellularJailTotal,
  documentRecords,
  freedomRecords,
  freedomRegisterSources,
} from "../../lib/freedom-records";

export default function HistoryExplorer() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All geographic groupings");
  const regions = [
    "All geographic groupings",
    ...new Set(freedomRecords.flatMap((item) => item.regions ?? [item.state])),
  ];
  const people = useMemo(
    () =>
      freedomRecords.filter((item) => {
        const haystack = `${item.name} ${item.state} ${item.district} ${item.movement} ${item.record}`.toLowerCase();
        return (
          (region === "All geographic groupings" ||
            (item.regions ?? [item.state]).includes(region)) &&
          haystack.includes(query.toLowerCase())
        );
      }),
    [query, region],
  );
  const documents = useMemo(
    () =>
      documentRecords.filter((item) =>
        `${item.title} ${item.person} ${item.documentType} ${item.publisher}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const bengalSelected = ["West Bengal", "Undivided Bengal", "Bengal-linked records"].includes(region);

  return (
    <>
      <section className="register-source-map" id="sources">
        <div className="register-source-lead">
          <p className="eyebrow">National source map</p>
          <h2>No single list contains everyone.</h2>
          <p>
            Martyrs, surviving participants, officially recognised pensioners, prisoners and local movement stories
            are different populations. Their totals overlap and must not be added together.
          </p>
        </div>
        <div className="register-source-grid">
          {freedomRegisterSources.map((source) => (
            <article key={source.id}>
              <header><span>{source.status}</span><b>{source.publisher}</b></header>
              <h3>{source.title}</h3>
              <strong>{source.reportedCoverage}</strong>
              <dl>
                <div><dt>Contains</dt><dd>{source.includes}</dd></div>
                <div><dt>Does not mean</dt><dd>{source.doesNotInclude}</dd></div>
              </dl>
              <a href={source.url} target="_blank" rel="noreferrer">Open official source ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="cellular-jail-register" aria-labelledby="cellular-jail-heading">
        <div className="cellular-jail-lead">
          <p className="eyebrow">Official Cellular Jail register · {cellularJailSource.period}</p>
          <h2 id="cellular-jail-heading">Bengal was the largest recorded group.</h2>
          <p>
            The Ministry of Culture records <strong>398 revolutionaries from undivided Bengal</strong> among{" "}
            <strong>{cellularJailTotal} people</strong> jailed in Cellular Jail during the stated period—
            {((398 / cellularJailTotal) * 100).toFixed(1)}% of this specific register.
          </p>
          <a href={cellularJailSource.url} target="_blank" rel="noreferrer">
            Open the parliamentary answer · {cellularJailSource.date} ↗
          </a>
          <aside><b>Definition</b>{cellularJailSource.definition}<b>Limitation</b>{cellularJailSource.limitation}</aside>
        </div>
        <div className="cellular-jail-table">
          <header><span>Historical province / published category</span><b>Recorded people</b></header>
          {cellularJailProvinceRecords.map((item) => (
            <div key={item.province} className={item.province === "Bengal" ? "is-bengal" : undefined}>
              <span><strong>{item.province}</strong>{item.note && <small>{item.note}</small>}</span>
              <b>{item.count.toLocaleString("en-IN")}</b>
            </div>
          ))}
          <footer><strong>Published total</strong><b>{cellularJailTotal.toLocaleString("en-IN")}</b></footer>
        </div>
      </section>

      <section className="freedom-events" id="events">
        <div className="history-section-head">
          <p className="eyebrow">Tragedy, resistance and public memory</p>
          <h2>Events must carry<br />their consequences.</h2>
        </div>
        <p className="event-register-note">
          This is an expanding source-reviewed event register, not a claim that six events represent the freedom struggle.
        </p>
        <div className="freedom-event-grid">
          {freedomEvents.map((event) => (
            <article key={event.id}>
              <header><span>{event.classification}</span><b>{event.date}</b></header>
              <p className="event-place">{event.geography}</p>
              <h3>{event.title}</h3>
              <p>{event.record}</p>
              <dl>
                <div><dt>Why it matters</dt><dd>{event.significance}</dd></div>
                <div><dt>Evidence limit</dt><dd>{event.limitation}</dd></div>
              </dl>
              <a href={event.sourceUrl} target="_blank" rel="noreferrer">{event.sourceTitle} ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="freedom-explorer" id="people">
        <div className="history-section-head">
          <p className="eyebrow">Individually reviewed profiles</p>
          <h2>People beyond<br />the usual shortlist.</h2>
        </div>
        <div className="freedom-controls">
          <label>
            Search name, place or movement
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Bhagat Singh, INA, Quit India…" />
          </label>
          <label>
            Geographic grouping
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        {bengalSelected && (
          <aside className="bengal-context">
            <strong>These profile cards are not Bengal&apos;s historical total.</strong>
            <span>
              This filter currently returns <b>{people.length} individually reviewed profiles</b> linked to the selected
              geography. The official table above separately records 398 Cellular Jail revolutionaries from undivided
              Bengal. It is a different source, period and measurement.
            </span>
          </aside>
        )}
        <p className="freedom-result">
          <b>{people.length}</b> source-reviewed profile cards in this view · not the number of freedom fighters from this jurisdiction
        </p>
        <div className="freedom-grid">
          {people.map((item) => (
            <article key={item.id}>
              <header><span>{item.state} · {item.district}</span><b>{item.period}</b></header>
              <h3>{item.name}</h3><em>{item.movement}</em><p>{item.record}</p>
              <aside><strong>Review note</strong>{item.reviewNote}</aside>
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.sourceTitle} ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="document-library" id="documents">
        <div><p className="eyebrow">Primary-document library</p><h2>What the document proves.<br /><span>What it does not.</span></h2></div>
        <div className="document-list">
          {documents.map((item) => (
            <article key={item.id}>
              <header><span>{item.documentType}</span><b>{item.date}</b></header>
              <h3>{item.title}</h3><p>{item.person} · {item.publisher}</p>
              <dl><div><dt>Supports</dt><dd>{item.whatItProves}</dd></div><div><dt>Does not establish</dt><dd>{item.whatItDoesNotProve}</dd></div></dl>
              <a href={item.url} target="_blank" rel="noreferrer">Open original public doorway ↗</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
