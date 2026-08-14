"use client";

import { useCallback, useEffect, useState } from "react";

type VisitorStats = {
  status: "available";
  activeVisitors: number;
  totalVisitors: number;
  activeWindowMinutes: number;
  refreshedAt: string;
};

const VISITOR_EVENT = "ied:visitor-count";

async function requestStats(method: "GET" | "POST") {
  const response = await fetch("/api/visitors", { method, cache: "no-store", credentials: "same-origin" });
  if (!response.ok) throw new Error("Visitor counter unavailable");
  const data = await response.json() as VisitorStats;
  if (data.status !== "available") throw new Error("Visitor counter unavailable");
  return data;
}

export function VisitorTracker() {
  useEffect(() => {
    let stopped = false;
    const heartbeat = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const data = await requestStats("POST");
        if (!stopped) window.dispatchEvent(new CustomEvent(VISITOR_EVENT, { detail: data }));
      } catch { /* A public counter must never block the website. */ }
    };
    void heartbeat();
    const interval = window.setInterval(() => void heartbeat(), 60_000);
    const onVisibility = () => void heartbeat();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return null;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const refresh = useCallback(async () => {
    try {
      setStats(await requestStats("GET"));
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    }
  }, []);

  useEffect(() => {
    const onCount = (event: Event) => {
      setStats((event as CustomEvent<VisitorStats>).detail);
      setUnavailable(false);
    };
    window.addEventListener(VISITOR_EVENT, onCount);
    const initial = window.setTimeout(() => void refresh(), 0);
    const interval = window.setInterval(() => void refresh(), 30_000);
    return () => {
      window.removeEventListener(VISITOR_EVENT, onCount);
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [refresh]);

  return <section className="visitor-ribbon" aria-label="Live public website traffic" aria-live="polite">
    <div className="visitor-ribbon-title"><i aria-hidden="true"/><span>Live public traffic</span></div>
    {unavailable && !stats ? <p className="visitor-unavailable">Counter temporarily unavailable</p> : <>
      <div className="visitor-stat"><strong>{stats ? stats.activeVisitors.toLocaleString("en-IN") : "—"}</strong><span>Active browsers</span></div>
      <div className="visitor-stat"><strong>{stats ? stats.totalVisitors.toLocaleString("en-IN") : "—"}</strong><span>Anonymous visitors recorded</span></div>
      <p className="visitor-note">“Active” means seen in the last {stats?.activeWindowMinutes ?? 5} minutes. No names or raw IP addresses are stored.</p>
    </>}
  </section>;
}
