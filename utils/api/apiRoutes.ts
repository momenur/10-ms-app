import { Language } from "@/types/api/product";

export const API_ROUTES = {
  PRODUCT: (slug: string, lang: Language = "en") =>
    `/products/${slug}?lang=${lang}`,
} as const;
