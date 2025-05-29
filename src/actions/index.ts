import { authActions } from "./auth.actions";
import { contentListActions } from "./content-list.actions";
import { contentActions } from "./content.actions";

export const server = {
  auth: authActions,
  contentList: contentListActions,
  contents: contentActions
};
