import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";

export type RequestPosterParticipationStatus = eventEnterFormSchemaType;

export interface ResponsePosterParticipationStatus {
  isParticipated: boolean;
}
