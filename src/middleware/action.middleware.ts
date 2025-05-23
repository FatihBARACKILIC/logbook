import { getActionContext } from "astro:actions";
import { defineMiddleware } from "astro:middleware";

const actionRedirects: Record<string, (data: any) => string> = {
  "contentList.createContentList": ({ uuid }: Record<any, any>) => `/app/lists/${uuid}`
};

export const actionMiddleware = defineMiddleware(async (c, next) => {
  const { action } = getActionContext(c);
  if (action?.calledFrom !== "form") {
    return await next();
  }
  const actionResult = await action.handler();
  if (actionResult.error) {
    return await next();
  }

  const redirectUrl = actionRedirects[action.name](actionResult.data);
  if (redirectUrl) {
    return c.redirect(redirectUrl);
  }
  return await next();
});
