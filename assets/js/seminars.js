/*
 * SEMINAR EDITING
 * Add, remove, or reorder talks only in the list below. The homepage and
 * seminar page are generated from this single list, so they stay in sync.
 *
 * Copy one complete {...} entry to add a date. Set cancelled: true for a
 * week without a seminar. Set homepage: true to show it on the homepage.
 * Each id must be unique and should use only lowercase letters, numbers,
 * and hyphens, for example: "2026-11-06-speaker-surname".
 */
(function () {
  "use strict";

  var seminars = [
    {
      id: "2026-09-18-henry-liu",
      monthEn: "Sep", monthZh: "9月", day: "18",
      dateEn: "Friday, September 18, 2026", dateZh: "2026年9月18日",
      titleEn: "A blow-up formula for Vafa–Witten theory",
      titleZh: "Vafa–Witten 理论的爆破公式",
      speakerEn: "Henry Liu · YMSC",
      speakerZh: "Henry Liu · 丘成桐数学科学中心",
      abstractEn: "I will explain how to use 3-Calabi–Yau wall-crossing techniques to obtain a relationship between the refined Vafa–Witten partition functions, in the sense of Tanaka and Thomas, of a smooth projective surface and of its blow-up at a point. This gives a powerful constraint on the structure of Vafa–Witten partition functions. Previously, such blow-up formulas were known only for the “instanton branch,” where the Higgs field is zero.",
      abstractZh: "我将介绍如何利用 3-Calabi–Yau 墙穿越技术，建立光滑射影曲面及其在一点处爆破的精细 Vafa–Witten 配分函数（Tanaka–Thomas 意义下）之间的关系。这一公式对 Vafa–Witten 配分函数的结构给出了有力约束。此前，此类爆破公式仅在 Higgs 场为零的所谓“瞬子分支”上得到证明。",
      homepage: true
    },
    {
      id: "2026-09-25-mid-autumn-festival",
      monthEn: "Sep", monthZh: "9月", day: "25",
      dateEn: "Friday, September 25, 2026", dateZh: "2026年9月25日",
      titleEn: "No seminar — Mid-Autumn Festival",
      titleZh: "中秋节暂停讨论班",
      cancelled: true,
      homepage: true
    },
    {
      id: "2026-10-09-number-theory-forum",
      monthEn: "Oct", monthZh: "10月", day: "9",
      dateEn: "Friday, October 9, 2026", dateZh: "2026年10月9日",
      titleEn: "No seminar — Zhongguancun Number Theory Forum",
      titleZh: "中关村数论论坛期间暂停讨论班",
      cancelled: true,
      homepage: true
    },
    {
      id: "2026-10-16-junzhe-lyu",
      monthEn: "Oct", monthZh: "10月", day: "16",
      dateEn: "Friday, October 16, 2026", dateZh: "2026年10月16日",
      titleEn: "Title to be announced", titleZh: "题目待定",
      speakerEn: "Junzhe Lyu · University of North Carolina at Chapel Hill",
      speakerZh: "Junzhe Lyu · 北卡罗来纳大学教堂山分校",
      homepage: true
    },
    {
      id: "2026-10-23-alyosha-latyntsev",
      monthEn: "Oct", monthZh: "10月", day: "23",
      dateEn: "Friday, October 23, 2026", dateZh: "2026年10月23日",
      titleEn: "Title to be announced", titleZh: "题目待定",
      speakerEn: "Alyosha Latyntsev · BIMSA",
      speakerZh: "Alyosha Latyntsev · BIMSA"
    },
    {
      id: "2026-10-30-yukinobu-toda",
      monthEn: "Oct", monthZh: "10月", day: "30",
      dateEn: "Friday, October 30, 2026", dateZh: "2026年10月30日",
      titleEn: "Title to be announced", titleZh: "题目待定",
      speakerEn: "Yukinobu Toda · Kavli IPMU",
      speakerZh: "Yukinobu Toda · Kavli IPMU"
    }
  ];

  function languagePair(tag, english, chinese, className) {
    if (!english && !chinese) return "";
    var classAttribute = className ? " class=\"" + className + "\"" : "";
    return "<" + tag + classAttribute + ">" +
      "<span data-lang-content=\"en\">" + english + "</span>" +
      "<span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>" + chinese + "</span>" +
      "</" + tag + ">";
  }

  function seminarMarkup(item, compact) {
    var classes = "seminar-item" + (item.cancelled ? " is-cancelled" : "");
    var tag = item.cancelled ?
      " <span class=\"tag\"><span data-lang-content=\"en\">No seminar</span><span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>暂停一次</span></span>" : "";
    var title = languagePair("span", item.titleEn, item.titleZh, "seminar-title-text");
    var heading = compact && !item.cancelled ?
      "<h3><a class=\"seminar-link\" href=\"seminars.html#" + item.id + "\">" + title + "</a></h3>" :
      "<h3>" + title + "</h3>";
    var abstract = !compact && (item.abstractEn || item.abstractZh) ?
      "<div class=\"abstract\" data-lang-content=\"en\"><h4>Abstract</h4><p>" + (item.abstractEn || "To be announced.") + "</p></div>" +
      "<div class=\"abstract\" data-lang-content=\"zh\" lang=\"zh-CN\" hidden><h4>摘要</h4><p>" + (item.abstractZh || "待公布。") + "</p></div>" : "";

    return "<article class=\"" + classes + "\"" + (!compact ? " id=\"" + item.id + "\"" : "") + ">" +
      "<div class=\"date-block\"><span data-lang-content=\"en\">" + item.monthEn + "</span><span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>" + item.monthZh + "</span><strong>" + item.day + "</strong></div>" +
      "<div class=\"seminar-summary\"><p class=\"eyebrow\"><span data-lang-content=\"en\">" + item.dateEn + "</span><span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>" + item.dateZh + "</span>" + tag + "</p>" +
      heading + languagePair("p", item.speakerEn, item.speakerZh, "speaker") + abstract + "</div></article>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-seminar-list]").forEach(function (container) {
      var compact = container.getAttribute("data-seminar-list") === "upcoming";
      var selected = compact ? seminars.filter(function (item) { return item.homepage; }) : seminars;
      container.innerHTML = selected.map(function (item) { return seminarMarkup(item, compact); }).join("");
      var currentLanguage = document.documentElement.lang === "zh-CN" ? "zh" : "en";
      container.querySelectorAll("[data-lang-content]").forEach(function (element) {
        element.hidden = element.getAttribute("data-lang-content") !== currentLanguage;
      });
    });
  });
})();
