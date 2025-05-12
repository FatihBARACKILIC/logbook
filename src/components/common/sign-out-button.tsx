import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { LogOutIcon } from "lucide-react";
import { toast } from "../toast";
import { Button } from "../ui/button";

type Props = {
  redirect?: string;
};

export function SignOutButton({ redirect = "/auth/sign-in" }: Props) {
  const handleSignOut = async () => {
    const { error } = await actions.auth.signOut();
    if (error) {
      return toast.error(error.name, {
        description: error.message
      });
    }
    return navigate(redirect);
  };

  return (
    <Button type="button" size="icon" variant="ghost" onClick={handleSignOut}>
      <LogOutIcon />
      <span className="sr-only">Sign Out</span>
    </Button>
  );
}
