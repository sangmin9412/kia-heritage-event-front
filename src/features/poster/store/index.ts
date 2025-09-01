import { create } from "zustand";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";
import { persist, createJSONStorage } from "zustand/middleware";
import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form/schema/validation";

type UserForm = Partial<eventEnterFormSchemaType>;
type PosterForm = Partial<createPosterFormSchemaType>;

type EventEnterFormState = {
  userForm: UserForm;
  setUserForm: (form: UserForm) => void;
  posterForm: PosterForm;
  setPosterForm: (form: PosterForm) => void;
  userStory: string;
  setUserStory: (story: string) => void;
};

export const useEventEnterFormStore = create<EventEnterFormState>()(
  persist(
    set => ({
      userForm: {},
      setUserForm: form => {
        set({ userForm: form });
        // 쿠키에도 동일한 데이터 저장
        // const currentState = get();
        // setCookieData("event-enter-form", { ...currentState, userForm: form });
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
        // const currentState = get();
        // setCookieData("create-poster-form", { ...currentState, posterForm: form });
      },
      userStory: "",
      setUserStory: story => {
        set({ userStory: story });
        // 쿠키에도 동일한 데이터 저장
        // const currentState = get();
        // setCookieData("user-story", { ...currentState, userStory: story });
      }
    }),
    {
      name: "event-enter-form",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
