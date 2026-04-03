
import { ParticipationConstraint } from "@/types/types";

export const CONSTRAINT_BACKGROUNDS: Record<ParticipationConstraint, string> = {
  [ParticipationConstraint.EVERYONE]: "bg-[url('/raffles-page/type-blue.webp')] bg-cover bg-center",
  [ParticipationConstraint.PREMIUM]: "bg-[url('/raffles-page/type-gold.webp')] bg-cover bg-center",
  [ParticipationConstraint.REFERENCE]: "bg-[url('/raffles-page/type-gray.webp')] bg-cover bg-center",
  [ParticipationConstraint.FOLLOWER]: "bg-[url('/raffles-page/type-purple.webp')] bg-cover bg-center",
  [ParticipationConstraint.ROLE]: "bg-[url('/raffles-page/type-dark.webp')] bg-cover bg-center",
};

export const CONSTRAINT_LABELS: Record<ParticipationConstraint, string> = {
  [ParticipationConstraint.EVERYONE]: "Herkes Katılabilir",
  [ParticipationConstraint.PREMIUM]: "Sadece Premium",
  [ParticipationConstraint.REFERENCE]: "Referanslı Üye",
  [ParticipationConstraint.FOLLOWER]: "Sadece Takipçi",
  [ParticipationConstraint.ROLE]: "Özel Rol",
};

export const SHIMMER_CLASS = "animate-pulse bg-neutral-700/50 rounded";