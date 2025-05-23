import { db } from "@/lib/database";
import { createContentList } from "@/services/content-lists/create.content-lists";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:content";

export const contentListActions = {
  createContentList: defineAction({
    accept: "form",
    input: z.object({
      title: z.string().min(1)
    }),
    handler: async ({ title }, c) => {
      const {
        user: { userId }
      } = c.locals;

      const isExist = await db.query.contentListsTableSchema.findFirst({
        where: (table, { and, eq }) => and(eq(table.userId, userId), eq(table.title, title))
      });
      if (isExist) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Content list already exist"
        });
      }

      const response = await createContentList({ userId, title });
      if (!response) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Something went wrong"
        });
      }
      return response;
    }
  })
};
