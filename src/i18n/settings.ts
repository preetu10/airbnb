export const languages = ["en", "bn"] as const;
export type Language = (typeof languages)[number];

export const fallbackLng: Language = "en";
