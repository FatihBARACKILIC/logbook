import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils/cn";
import { useState, type ComponentPropsWithoutRef } from "react";

type Props = {
  token: string;
} & ComponentPropsWithoutRef<"form">;

export function VerifySignInForm({ token, className, ...props }: Props) {
  const [value, setValue] = useState(token.toUpperCase());

  return (
    <form id="verify-sign-in-form" className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify</h1>
        <p className="text-muted-foreground text-sm text-balance">
          We’ve sent a 8-digit code to your email. Please enter it below to sign in.
        </p>
      </div>

      <div className="grid gap-6">
        <InputOTP
          minLength={8}
          maxLength={8}
          value={value}
          onChange={(value) => setValue(value.toUpperCase())}
          name="otp"
          autoFocus
          autoComplete="one-time-code"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-destructive text-center text-xs md:text-sm" id="otp-error"></p>
      </div>

      {/* <p className="text-muted-foreground text-center text-sm text-balance">
        {value === "" ? <>Enter your one-time password.</> : <>You entered: {value}</>}
      </p> */}

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2"> Or </span>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-4">
        <Button type="button" id="change-mail" className="w-full" variant="outline">
          Change Mail
        </Button>
        <div className="text-center text-sm">
          Didn&apos;t receive the code?{" "}
          <Button
            id="resend-otp"
            variant="link"
            type="button"
            className="hover:text-muted-foreground p-0 underline underline-offset-4 transition-colors duration-300 ease-in-out"
          >
            Resend
          </Button>
        </div>
      </div>
    </form>
  );
}
