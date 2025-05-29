import { statusEnum } from "../database/schemas";

type StatusKeys = (typeof statusEnum.enumValues)[number];

export const contentStatusReadableRecord: Record<StatusKeys, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
  "was-left": "Was Left"
};
