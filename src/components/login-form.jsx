"use client";

// import HomeLink from "@/src/components/HomeLink.jsx";
// import {LogInButton }from '../components/LogInButton';
// export function LoginForm({ className, ...props }) {
//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Welcome back</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-4 mb-6">
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={async () => {
//                 document.cookie = "role; path=/";
//                 await signIn("google", {
//                   callbackUrl: "/chat",
//                   type: "signin",
//                 });
//               }}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                 <path
//                   d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//                   fill="currentColor"
//                 />
//               </svg>
//               Login with Google
//             </Button>
//           </div>
//           <HomeLink />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {LogInButton} from "./LogInButton";

export function LoginForm() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="student">
        <TabsList>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin</CardTitle>
              <CardDescription>
                Make changes to your admin here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <LogInButton role='admin' />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student</CardTitle>
              <CardDescription>
                Change your student here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <LogInButton role="student" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
