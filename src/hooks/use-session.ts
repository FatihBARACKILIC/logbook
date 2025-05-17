import { getSession } from "@/lib/api/auth/session";
import type { Session } from "@/lib/types/session.types";
import { useEffect, useState } from "react";

export function useSession() {
  const [user, setUser] = useState<Session | undefined>();

  useEffect(() => {
    const getData = async () => {
      const response = await getSession();
      setUser(response);
    };
    getData();
  }, []);

  return user;
}
