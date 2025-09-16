import { create } from "zustand";
import { eventEnterFormSchemaType } from "@/features/poster/event-enter-form";
import {
  carCodesEnum,
  createPosterFormSchemaType,
  frameCodesEnum
} from "@/features/poster/create-poster-form/schema/validation";
import { getPosterForm } from "@/features/poster/api";

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
  story: string;
  setStory: (story: string) => void;
  // 사용자 초기 데이터 로드 여부
  _hasUserHydrated: boolean;
  setHasUserHydrated: (state: boolean) => void;
  // 포스터 초기 데이터 로드 여부
  _hasPosterHydrated: boolean;
  setHasPosterHydrated: (state: boolean) => void;
  // 스토어 초기화
  resetStore: () => void;
};

export const useEventEnterFormStoreInitialState: {
  userForm: UserForm;
  posterForm: createPosterFormSchemaType;
} = {
  userForm: {},
  posterForm: {
    frameCode: frameCodesEnum.HORIZONTAL,
    imageScale: 1.5,
    imageVertical: 0,
    imageHorizontal: 0,
    title: "",
    instagramId: "",
    imageBase64: "",
    carCode: carCodesEnum.CAR01
  }
};

export const useEventEnterFormStore = create<EventEnterFormState>()((set, get) => ({
  _hasUserHydrated: false,
  setHasUserHydrated: (state: boolean) => {
    set({ _hasUserHydrated: state });
  },
  _hasPosterHydrated: false,
  setHasPosterHydrated: (state: boolean) => {
    set({ _hasPosterHydrated: state });
  },
  userForm: useEventEnterFormStoreInitialState.userForm,
  setUserForm: form => {
    set({ userForm: form });
  },
  posterForm: useEventEnterFormStoreInitialState.posterForm,
  setPosterForm: form => {
    set({ posterForm: form });
  },
  story: "",
  setStory: story => {
    set({ story: story });
  },
  resetStore: () => {
    set({
      userForm: {
        ...useEventEnterFormStoreInitialState.userForm,
        phone: get().userForm.phone
      },
      posterForm: useEventEnterFormStoreInitialState.posterForm,
      story: "",
      _hasUserHydrated: false,
      _hasPosterHydrated: false
    });
  }
}));
