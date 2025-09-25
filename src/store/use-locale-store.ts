import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLocaleStore = create()(
  persist(
    (set) => ({
      locale: "en",

      setLocale: (locale: string) => set({ locale }),
    }),
    {
      name: "locale-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
