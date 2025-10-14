import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";

const fetchDeadlines = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch deadlines");
  return response.json();
};

const compareDeadlinesDesc = (a, b) => Date.parse(b.time) - Date.parse(a.time);

const PastDeadlines = () => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || "/";
  const DEADLINES_URL = `${baseUrl}DEADLINES.json`;

  const location = useLocation();

  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndSetDeadlines = async () => {
    try {
      const data = await fetchDeadlines(DEADLINES_URL);
      const past = data.deadlines
        .filter((d) => Date.parse(d.time) < Date.now())
        .sort(compareDeadlinesDesc);
      setDeadlines(past);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetDeadlines();
  }, [DEADLINES_URL]);

  const formatDeadline = (deadline) => {
    const searchParams = new URLSearchParams(location.search);
    const deadlineStyle = searchParams.get("deadlineStyle");

    const unixTimeDeadline = Date.parse(deadline.time);
    const unixTimeNow = Date.now();

    const delta = unixTimeNow - unixTimeDeadline; // прошло
    const deltaMinutes = delta / 60000;
    const deltaHours = deltaMinutes / 60;
    const deltaDays = deltaHours / 24;
    const deltaHoursSDays = deltaHours - 24 * Math.floor(deltaDays);
    const deltaMinutesSDays = deltaMinutes - 60 * Math.floor(deltaHours);

    let deadlineName = deadline.name
      .replace("[Тест]", "📚")
      .replace("[тест]", "📚")
      .replace("[Лекция]", "👨‍🏫")
      .replace("[лекция]", "👨‍🏫")
      .replace("[Защита]", "🛡")
      .replace("[защита]", "🛡")
      .replace("[Лаба]", "💻")
      .replace("[лаба]", "💻")
      .replace("[Дз]", "📝")
      .replace("[дз]", "📝")
      .replace("[Опрос]", "🖊️")
      .replace("[опрос]", "🖊️")
      .replace("[Контрольная]", "🥀")
      .replace("[контрольная]", "🥀")
      .replace("[Типовик]", "📔")
      .replace("[типовик]", "📔");

    const link = deadline.url;

    let text = "";

    if (link) {
      if (deadlineStyle === "new") {
        text += `<b style="position: relative; display: inline-block;">
            <a href="${link}" target="_blank" title="Открыть ${deadlineName}" 
            style="text-decoration: none; color: inherit; position: relative; z-index: 1;"
            onmouseover="this.parentNode.querySelector('span').style.height='2px'" 
            onmouseout="this.parentNode.querySelector('span').style.height='1px'">
            ${deadlineName}
            </a>
            <span style="position: absolute; bottom: 2px; left: 0; right: 0; height: 1px; background: rgba(157,128,218,0.6); z-index: 0; transition: height 0.1s ease;"></span>
        </b>`;
      } else {
        text += `<b style="padding-left: 5px; border-left: 2px solid rgba(157,128,218,0.5);">
            <a href="${link}" target="_blank" title="Открыть ${deadlineName}" 
            style="text-decoration: none; color: inherit;"
            onmouseover="this.style.opacity='0.8'" 
            onmouseout="this.style.opacity='1'">
            ${deadlineName}
            </a>
        </b>`;
      }
    } else {
      text += `<b style="padding-left: 7px;">${deadlineName}</b>`;
    }

    // Добавляем информацию "назад"
    if (deltaDays < 1) {
      text += ` — ${Math.floor(deltaHoursSDays)}ч ${Math.floor(deltaMinutesSDays)}м назад`;
    } else if (deltaDays < 3) {
      text += ` — ${Math.floor(deltaDays)} ${Math.floor(deltaDays) === 1 ? "день" : "дня"} ${Math.floor(deltaHoursSDays)}ч ${Math.floor(deltaMinutesSDays)}м назад`;
    } else {
      text += ` — ${Math.floor(deltaDays)} ${Math.floor(deltaDays) === 3 || Math.floor(deltaDays) === 4 ? "дня" : "дней"} назад`;
    }

    const options = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", weekday: "short" };
    text += ` (${new Date(unixTimeDeadline).toLocaleDateString("ru-RU", options)})`;

    return text;
  };

  if (loading) return <p>Загрузка прошедших дедлайнов...</p>;
  if (error) return <p>Ошибка при загрузке дедлайнов: {error}</p>;

  return (
    <div id="pastDeadlinesBlock" style={{ marginBottom: "20px" }}>
      <h2>Прошедшие дедлайны</h2>
      {deadlines.length === 0 ? (
        <p>Пока нет прошедших дедлайнов 🎉</p>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: deadlines.map(formatDeadline).filter(Boolean).join("<br>"),
          }}
          style={{ lineHeight: "1.8em" }}
        />
      )}
    </div>
  );
};

export default PastDeadlines;
