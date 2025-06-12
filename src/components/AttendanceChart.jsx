"use client";

import { Label, Pie, PieChart } from "recharts";
import axios from "axios";
import { useAppContext } from "@/src/context/AppContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { LoadingCard } from "./LoadingCard";
import { toast } from "sonner";

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  present: {
    label: "Present",
    color: "var(--chart-5)",
  },
  absent: {
    label: "Absent",
    color: "var(--chart-4)",
  },
};

export default function AttendanceChart({
  totalSessions,
  isAdmin = null,
  courseId,
}) {
  const { studentId, setstudentId, presentPercentage, setpresentPercentage } =
    useAppContext();
  const [isLoading, setisLoading] = useState(false);

  const chartData = [
    { type: "present", percentage: presentPercentage, fill: "#22c55e" },
    { type: "absent", percentage: 100 - presentPercentage, fill: "#ec003f" },
  ];
  // 155dfc
  useEffect(() => {
    setpresentPercentage(undefined);
    if (!studentId) return;

    if (!totalSessions) {
      setstudentId("");
      toast.error("No past sessions found");
      return;
    }

    setisLoading(true);
    axios
      .get(`/api/attendance?studentId=${studentId}&courseId=${courseId}`)
      .then((res) => {
        console.log(res);
        setpresentPercentage(
          Number(((res.data.data / totalSessions) * 100).toFixed(2))
        );
        toast.success(res.data.message);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }, [studentId]);

  // useEffect(() => {
  //   console.log(presentPercentage, isLoading);
  // }, [presentPercentage, isLoading]);

  return (
    <Card className="col-span-1 md:col-span-2 2xl:h-103 gap-0 py-8 flex flex-col justify-between shadow-md border-2 border-white/20 md:rounded-2xl hover:bg-white hover:scale-105 transition-all duration-500 2xl:basis-[36%]">
      <CardHeader className="items-center px-0">
        <CardTitle className="text-center text-xl">
          Attendance Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="flex px-0 items-center justify-center h-full">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          {isLoading ? (
            <LoadingCard />
          ) : typeof presentPercentage === "number" ? (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="percentage"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox?.cx) return null;
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          className="fill-foreground text-3xl font-bold"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {presentPercentage}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                        >
                          %
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center h-full text-center text-lg text-muted-foreground">
              <CardTitle>
                {isAdmin ? "No Student Selected" : "No Course Selected"}
              </CardTitle>
              <CardDescription>
                {isAdmin
                  ? "Select a student to view attendance"
                  : "Select a course to view attendance"}
              </CardDescription>
            </div>
          )}
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex px-0 justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Present
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          Absent
        </div>
      </CardFooter>
    </Card>
  );
}
