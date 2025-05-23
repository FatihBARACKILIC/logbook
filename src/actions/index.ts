import { authActions } from "./auth.actions";
import { contentListActions } from "./content-list.actions";

export const server = {
  auth: authActions,
  contentList: contentListActions
};
