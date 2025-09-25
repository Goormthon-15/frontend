"use client";

import React, { createContext, useContext } from "react";
import { KeyOfTranslation, Translation, ValueOfTranslation } from "@/libs/i18n/utils/loadTranslation";
import { Locale } from "@/libs/i18n";

interface IContext {
  serverLocale: Locale;
  localeJson: Translation | null;
}

interface Props {
  value: IContext;
  children: React.ReactNode;
}

export interface ITranslation {
  t: (content: KeyOfTranslation) => ValueOfTranslation;
}

export const LocaleContext = createContext<IContext>({ localeJson: null, serverLocale: "en" });
export const useLocaleContext = () => useContext(LocaleContext);

export const LocaleProvider = ({ value, children }: Props) => {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useTranslation = (): ITranslation => {
  const { localeJson } = useLocaleContext();
  if (!localeJson) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  const t: ITranslation["t"] = (content: KeyOfTranslation) => localeJson[content];
  return { t };
};
