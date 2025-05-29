import { db } from "@/lib/database";
import { contentsTableSchema, type ContentsTableSchema } from "@/lib/database/schemas";
import { and, eq } from "drizzle-orm";

type UpdateContentEpisode = {
  contentId: number;
  episode: number;
};

export async function updateContentEpisode({
  contentId,
  episode
}: UpdateContentEpisode): Promise<ContentsTableSchema | undefined> {
  const response = await db
    .update(contentsTableSchema)
    .set({ episode })
    .where(eq(contentsTableSchema.id, contentId))
    .returning();
  return response[0];
}
