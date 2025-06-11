"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogInButton } from "./Buttons";
import { User, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  return (
    <Tabs defaultValue="student" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <TabsTrigger
          value="admin"
          className="data-[state=active]:bg-[#f6f7f9] data-[state=active]:text-black"
        >
          <ShieldCheck className="mr-2 h-4 w-4" /> Admin
        </TabsTrigger>
        <TabsTrigger
          value="student"
          className="data-[state=active]:bg-[#f6f7f9] data-[state=active]:text-black"
        >
          <User className="mr-2 h-4 w-4" /> Student
        </TabsTrigger>
      </TabsList>

      <TabsContent value="admin">
        <Card className="hover:bg-white border border-gray-200 rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Admin Login</CardTitle>
            <CardDescription className="text-gray-500">
              Manage courses, view sessions, and track attendance.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <LogInButton role="admin" />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="student">
        <Card className="hover:bg-white border border-gray-200 rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Student Login</CardTitle>
            <CardDescription className="text-gray-500">
              View your attendance and access course details.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <LogInButton role="student" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
