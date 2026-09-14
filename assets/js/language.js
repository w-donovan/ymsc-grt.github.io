(function () {
  "use strict";

  var storageKey = "grt-ymsc-language";
  var requested = new URLSearchParams(window.location.search).get("lang");
  var stored = null;

  try {
    stored = window.localStorage.getItem(storageKey);
  } catch (error) {
    stored = null;
  }

  function selectLanguage(language, updateAddress) {
    var selected = language === "zh" ? "zh" : "en";
    document.documentElement.lang = selected === "zh" ? "zh-CN" : "en";
    document.title = selected === "zh" ? document.body.dataset.titleZh : document.body.dataset.titleEn;

    document.querySelectorAll("[data-lang-content]").forEach(function (element) {
      element.hidden = element.getAttribute("data-lang-content") !== selected;
    });

    document.querySelectorAll("[data-lang-select]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-lang-select") === selected));
    });

    try {
      window.localStorage.setItem(storageKey, selected);
    } catch (error) {
      /* The selector still works when browser storage is unavailable. */
    }

    if (updateAddress && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (selected === "zh") {
        url.searchParams.set("lang", "zh");
      } else {
        url.searchParams.delete("lang");
      }
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var browserLanguage = /^zh\b/i.test(window.navigator.language || "") ? "zh" : "en";
    selectLanguage(requested === "zh" || requested === "en" ? requested : (stored || browserLanguage), false);

    document.querySelectorAll("[data-lang-select]").forEach(function (button) {
      button.addEventListener("click", function () {
        selectLanguage(button.getAttribute("data-lang-select"), true);
      });
    });
  });
})();

