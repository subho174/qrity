"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";

export default function HandleServerAction({
  children = null,
  className = "",
  submitFunction,
  btnText,
  loadingBtnText,
  // onSuccess = () => {},
  initialState = { data: null, message: "" },
}) {
  const [state, formAction, isPending] = useActionState(
    submitFunction,
    // () => {
    //   getLocation();
    //   submitFunction();
    // },
    initialState
  );
  console.log(state);
  
  // const router = useRouter();
  // useEffect(() => {
  //   const changeState = () =>
  //     state?.data
  //       ? state.data === "deleted"
  //         ? onSuccess("")
  //         : onSuccess(state.data)
  //       : "";
  //   console.log(state);
  //   changeState();
  //   // state?.message === "Joined Course successfully" ? router.refresh() : "";
  // }, [state]);
  return (
    <form action={formAction} className={`${className}`}>
      {children}
      <Button type="submit" disabled={isPending} className="">
        {isPending ? (
          <>
            <Loader2 className="animate-spin" /> {loadingBtnText}...
          </>
        ) : (
          btnText
        )}
      </Button>
    </form>
  );
}
