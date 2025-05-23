import { db } from "@/lib/database";
import { contentListsTableSchema, type ContentListsTableSchema } from "@/lib/database/schemas";

type CreateContentListProps = {
  userId: number;
  title: string;
};

export async function createContentList({
  userId,
  title
}: CreateContentListProps): Promise<ContentListsTableSchema | undefined> {
  const [response] = await db
    .insert(contentListsTableSchema)
    .values({
      userId,
      title
    })
    .returning();
  return response;
}
