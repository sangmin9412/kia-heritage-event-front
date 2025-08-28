import { create } from "zustand";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";
import { persist, createJSONStorage } from "zustand/middleware";

interface posterFormType {
  name: string;
}

type EventEnterFormState = {
  userForm: Partial<eventEnterFormSchemaType>;
  setUserForm: (form: Partial<eventEnterFormSchemaType>) => void;
  posterForm: posterFormType;
  setPosterForm: (form: posterFormType) => void;
};

export const useEventEnterFormStore = create<EventEnterFormState>()(
  persist(
    set => ({
      userForm: {},
      setUserForm: form => set({ userForm: form }),
      posterForm: {
        name: ""
      },
      setPosterForm: form => set({ posterForm: form })
    }),
    {
      name: "event-enter-form",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
