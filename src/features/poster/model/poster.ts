import { createPosterFormSchemaType } from "@/features/poster/create-poster-form";
import { eventEnterFormSchemaType } from "@/features/poster/event-enter-form";

export type RequestPosterParticipation = eventEnterFormSchemaType;

export interface ResponsePosterParticipation {
  isParticipated: boolean;
}

export type RequestPosterCreate = eventEnterFormSchemaType &
  createPosterFormSchemaType & {
    userStory: string;
  };

export interface ResponsePosterCreate {
  posterId: string;
}

export type RequestPosterScreenshot = createPosterFormSchemaType;

// export interface ResponsePosterScreenshot {}
