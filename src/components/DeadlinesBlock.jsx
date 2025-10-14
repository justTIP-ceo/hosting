import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

const fetchDeadlines = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch deadlines");
  return response.json();
};

const compareDeadlines = (a, b) => Date.parse(a.time) - Date.parse(b.time);

const Deadlines = () => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || "/";
  const DEADLINES_URL = `${baseUrl}DEADLINES.json`;
  const base = useBaseUrl("/");

  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAndSet = async () => {
      try {
        const data = await fetchDeadlines(DEADLINES_URL);
        if (!mounted) return;
        setDeadlines(data.deadlines.sort(compareDeadlines));
      } catch (e) {
        if (!mounted) return;
        setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAndSet();

    const now = new Date();
    const nextMinute = new Date(now);
    nextMinute.setSeconds(0, 0);
    nextMinute.setMinutes(now.getMinutes() + 1);
    const delay = nextMinute - now;

    const timeoutId = setTimeout(() => {
      fetchAndSet();
      const intervalId = setInterval(fetchAndSet, 60000);
      window.__deadline_interval__ = intervalId;
    }, delay);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      const id = window.__deadline_interval__;
      if (id) clearInterval(id);
    };
  }, [DEADLINES_URL]);

  const formatName = (name) =>
    name
      .replace(/\[Тест\]|\[тест\]/gi, "📚")
      .replace(/\[Лекция\]|\[лекция\]/gi, "👨‍🏫")
      .replace(/\[Защита\]|\[защита\]/gi, "🛡")
      .replace(/\[Лаба\]|\[лаба\]/gi, "💻")
      .replace(/\[Дз\]|\[дз\]/gi, "📝")
      .replace(/\[Опрос\]|\[опрос\]/gi, "🖊️")
      .replace(/\[Контрольная\]|\[контрольная\]/gi, "🥀")
      .replace(/\[Типовик\]|\[типовик\]/gi, "📔")
      .replace(/\[Коллоквиум\]|\[коллоквиум\]/gi, "🗣️");

  if (loading) return <p>Загрузка дедлайнов...</p>;
  if (error) return <p>Не удалось загрузить дедлайны: {error}</p>;

  const nowTimestamp = Date.now();

  const upcomingElements = deadlines
    .filter((d) => Date.parse(d.time) > nowTimestamp)
    .map((d, idx) => {
      const unix = Date.parse(d.time);
      const delta = unix - nowTimestamp;

      const minutes = Math.floor(delta / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const hoursRest = hours - 24 * days;
      const minutesRest = minutes - 60 * hours;

      const name = formatName(d.name);
      const isInternal = !!d.to;
      const resolvedLink = isInternal ? `${base}${d.to}` : d.url || "";

      let timeText =
        days < 1
          ? `${hoursRest}ч ${minutesRest}м`
          : days < 3
          ? `${days} ${days === 1 ? "день" : "дня"} ${hoursRest}ч ${minutesRest}м`
          : `${days} ${[3, 4].includes(days) ? "дня" : "дней"}`;

      const prettyDate = new Date(unix).toLocaleDateString("ru-RU", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
      });

      return (
        <div key={idx} style={{ marginBottom: 8, lineHeight: "1.6em" }}>
          {resolvedLink ? (
            isInternal ? (
              <Link to={resolvedLink} style={{ textDecoration: "none", color: "inherit" }}>
                <strong style={{ paddingLeft: 7, borderLeft: "2px solid rgba(157,128,218,0.5)" }}>{name}</strong>
              </Link>
            ) : (
              <a
                href={resolvedLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit", paddingLeft: 7, borderLeft: "2px solid rgba(157,128,218,0.5)" }}
              >
                <strong>{name}</strong>
              </a>
            )
          ) : (
            <strong style={{ paddingLeft: 7 }}>{name}</strong>
          )}
          <span> — {timeText} ({prettyDate})</span>
        </div>
      );
    });

  return (
    <div id="deadlinesBlock" style={{ marginBottom: 20 }}>
      <h2>Предстоящие дедлайны</h2>
      {upcomingElements.length ? upcomingElements : <p>Нет предстоящих дедлайнов.</p>}
    </div>
  );
};

export default Deadlines;
