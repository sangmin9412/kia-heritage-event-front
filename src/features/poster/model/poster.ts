import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";

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
