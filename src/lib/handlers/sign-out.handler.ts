import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { toast } from "sonner";

export async function signOutHandler() {
  const { error } = await actions.auth.signOut();
  if (error) {
    return toast.error(error.name, {
      description: error.message
    });
  }
  return navigate("/auth/sign-in");
}
