import { create } from "zustand";
import { eventEnterFormSchemaType } from "@/features/poster/event-enter-form";
import { persist, createJSONStorage } from "zustand/middleware";
import { createPosterFormSchemaType } from "@/features/poster/create-poster-form/schema/validation";

type UserForm = Partial<eventEnterFormSchemaType>;
type PosterForm = Partial<createPosterFormSchemaType>;

type EventEnterFormState = {
  // 유저 폼
  userForm: UserForm;
  setUserForm: (form: UserForm) => void;
  // 포스터 폼
  posterForm: PosterForm;
  setPosterForm: (form: PosterForm) => void;
  hydratedPosterForm: PosterForm;
  setHydratedPosterForm: (form: PosterForm) => void;
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

export const useEventEnterFormStoreInitialState: {
  userForm: UserForm;
  posterForm: createPosterFormSchemaType;
} = {
  userForm: {},
  posterForm: {
    frameType: "horizontal",
    imageScale: 1,
    imageVertical: 0,
    imageHorizontal: 0,
    posterTitle: "",
    instagramName: "",
    imageBase64: "",
    carType: "car_type_01"
  }
};

export const useEventEnterFormStore = create<EventEnterFormState>()(
  persist(
    set => ({
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
      userForm: useEventEnterFormStoreInitialState.userForm,
      setUserForm: form => {
        set({ userForm: form });
      },
      posterForm: useEventEnterFormStoreInitialState.posterForm,
      setPosterForm: form => {
        set({ posterForm: form });
      },
      hydratedPosterForm: useEventEnterFormStoreInitialState.posterForm,
      setHydratedPosterForm: form => {
        set({ hydratedPosterForm: form });
      },
      userStory: "",
      setUserStory: story => {
        set({ userStory: story });
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
        state?.setHydratedPosterForm(state?.posterForm);
        state?.setHasHydrated(true);
      }
    }
  )
);
