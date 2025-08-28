import { create } from "zustand";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";
import { persist, createJSONStorage } from "zustand/middleware";
import { setCookieData } from "@/lib/cookie-utils";
import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form/schema/validation";

type EventEnterFormState = {
  userForm: Partial<eventEnterFormSchemaType>;
  setUserForm: (form: Partial<eventEnterFormSchemaType>) => void;
  posterForm: Partial<createPosterFormSchemaType>;
  setPosterForm: (form: Partial<createPosterFormSchemaType>) => void;
};

export const useEventEnterFormStore = create<EventEnterFormState>()(
  persist(
    (set, get) => ({
      userForm: {},
      setUserForm: form => {
        set({ userForm: form });
        // 쿠키에도 동일한 데이터 저장
        const currentState = get();
        setCookieData("event-enter-form", { ...currentState, userForm: form });
      },
      posterForm: {
        frameType: "horizontal",
        imageScale: 1,
        imageVertical: 0,
        imageHorizontal: 0,
        posterTitle: "",
        instagramName: ""
      },
      setPosterForm: form => {
        set({ posterForm: form });
        // 쿠키에도 동일한 데이터 저장
        const currentState = get();
        setCookieData("create-poster-form", { ...currentState, posterForm: form });
      }
    }),
    {
      name: "event-enter-form",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
