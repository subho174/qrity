"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

export default function HandleServerAction({
  children = null,
  className = "",
  style = "",
  submitFunction,
  btnText,
  loadingBtnText,
  onSuccess = () => {},
  variant = "",
  initialState = { data: null, message: "" },
}) {
  const [state, formAction, isPending] = useActionState(
    submitFunction,
    initialState
  );
  const { setpresentPercentage } = useAppContext();

  const router = useRouter();
  useEffect(() => {
    setpresentPercentage(undefined);
    if (!state) return null;

    const changeState = () =>
      state.data
        ? state.data === "deleted"
          ? onSuccess("")
          : onSuccess(state.data)
        : "";
    if (state.message) {
      if (Math.floor(state.status / 100) === 2) toast.success(state.message);
      if (Math.floor(state.status / 100) === 4) toast.error(state.message);
      if (Math.floor(state.status / 100) === 5) toast.info(state.message);
    }
    changeState();

    if (state.message === "Joined Course successfully") router.refresh();
  }, [state]);

  return (
    <form action={formAction} className={`${className}`}>
      {children}
      <Button
        type="submit"
        disabled={isPending}
        variant={variant}
        className={`${style}`}
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" /> {loadingBtnText}...
          </>
        ) : btnText === "Log Out" ? (
          <>
            <LogOut /> {btnText}
          </>
        ) : (
          btnText
        )}
      </Button>
    </form>
  );
}
