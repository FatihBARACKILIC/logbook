import { db } from "@/lib/database";
import {
  contentsTableSchema,
  type ContentsInsertTableSchema,
  type ContentsTableSchema
} from "@/lib/database/schemas";

export async function createContent(
  newContentData: ContentsInsertTableSchema
): Promise<ContentsTableSchema> {
  const [newContent] = await db.insert(contentsTableSchema).values(newContentData).returning();
  return newContent;
}
