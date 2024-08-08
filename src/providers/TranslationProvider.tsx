"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { useEffect } from "react";
import i18n from "../app/i18n";
import { I18nextProvider } from "react-i18next";

export default function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = useSelector(
    (state: RootState) => state.localization.language
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      {children}
    </I18nextProvider>
  );
}
