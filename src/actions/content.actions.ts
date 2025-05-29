import { updateContentEpisode } from "@/services/contents/update.contents";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const contentActions = {
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
