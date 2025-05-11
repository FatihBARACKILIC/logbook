declare namespace App {
  interface SessionData {
    user: {
      userId: number;
      email?: string;
    };
    verificationTokens: {
      "sign-in"?: {
        code: string;
        createdAt: Date;
      };
    };
  }
}
