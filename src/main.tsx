import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation, initReactI18next } from "react-i18next";

import App from "./App";

import "./style.css";

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Name the variables for you": "Name the variables for you",
          "Select your variable naming convention.": "Select your variable naming convention.",
          "Describe the information of the varible.": "Describe the information of the varible.",
          "e.g. A variable to save the audio link.": "e.g. A variable to save the audio link.",
          "Name it!": "Name it!"
        }
      },
      zh: {
        translation: {
          "Name the variables for you": "帮助你命名变量",
          "Select your variable naming convention.": "选择你的命名规范.",
          "Describe the information of the varible.": "描述相关信息以便生成变量名.",
          "e.g. A variable to save the audio link.": "例，保存一个音频的链接.",
          "Name it!": "命名"
        }
      }
    },
    // lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
