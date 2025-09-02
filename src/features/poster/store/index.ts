import { create } from "zustand";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";
import { persist, createJSONStorage } from "zustand/middleware";
import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form/schema/validation";

type UserForm = Partial<eventEnterFormSchemaType>;
type PosterForm = Partial<createPosterFormSchemaType>;

type EventEnterFormState = {
  // 유저 폼
  userForm: UserForm;
  setUserForm: (form: UserForm) => void;
  // 포스터 폼
  posterForm: PosterForm;
  setPosterForm: (form: PosterForm) => void;
  // 사연 내용
  userStory: string;
  setUserStory: (story: string) => void;
  // 초기 데이터 로드 여부
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  // 포스터 이미지
  posterImage: string;
  setPosterImage: (image: string) => void;
};

export const useEventEnterFormStore = create<EventEnterFormState>()(
  persist(
    set => ({
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
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
      },
      posterImage: "",
      setPosterImage: image => {
        set({ posterImage: image });
      }
    }),
    {
      name: "event-enter-form",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error rehydrating storage:", error);
        }
        state?.setHasHydrated(true);
      }
    }
  )
);
