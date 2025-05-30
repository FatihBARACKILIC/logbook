import { getContentListByListUUIDAndUserId } from "@/services/content-lists/get.content-lists";
import { createContent } from "@/services/contents/create.contents";
import { updateContentEpisode } from "@/services/contents/update.contents";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const contentActions = {
  createContent: defineAction({
    accept: "form",
    input: z.object({
      listUUID: z.string(),
      title: z.string().min(1).max(256)
    }),
    handler: async ({ listUUID, title }, c) => {
      const contentList = await getContentListByListUUIDAndUserId(listUUID, c.locals.user.userId);
      if (!contentList) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Content list not found"
        });
      }

      const response = await createContent({ listId: contentList.id, title });
      return response;
    }
  }),
  updateEpisode: defineAction({
    accept: "json",
    input: z.object({
      contentId: z.number(),
      episode: z.number().min(0)
    }),
    handler: async ({ contentId, episode }, _c) => {
      const response = await updateContentEpisode({ contentId, episode });
      return response;
    }
  })
};
