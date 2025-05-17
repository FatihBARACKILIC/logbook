export type Session = Omit<Required<App.SessionData["user"]>, "userId">;
