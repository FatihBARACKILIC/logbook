import { db } from "@/lib/database";

export async function getContentListsByUserId(userId: number) {
  return await db.query.contentListsTableSchema.findMany({
    where: (table, { eq, and, isNull }) => and(isNull(table.deletedAt), eq(table.userId, userId)),
    with: {
      contents: true
    }
  });
}

export async function getContentListWithContents(userId: number, uuid: string) {
  return db.query.contentListsTableSchema.findFirst({
    where: (table, { eq, and }) => and(eq(table.userId, userId), eq(table.uuid, uuid)),
    with: {
      contents: true
    }
  });
}
