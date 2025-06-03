"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import HandleServerAction from "./handleServerAction";
import { createSession } from "../server/server";

export default function TimePicker({ onSubmit, courseCode,facultyId,setSessionURL }) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  console.log(courseCode,facultyId);
  
  const times = generateTimes();

  function generateTimes(interval = 30) {
    const list = [];
    for (let h = 7; h <= 19; h++) {
      for (let m = 0; m < 60; m += interval) {
        const hour = h % 12 === 0 ? 12 : h % 12;
        const minute = m.toString().padStart(2, "0");
        const ampm = h < 12 ? "AM" : "PM";
        list.push(`${hour}:${minute} ${ampm}`);
      }
    }
    return list;
  }

  // const handleConfirm = () => {
  //   if (selectedTime) {
  //     onSubmit(selectedTime);
  //     setOpen(false);
  //   }
  // };
useEffect(() => {
    if(!selectedTime) return;
    console.log(selectedTime);
    
}, [selectedTime])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Session Start Time</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-60 mt-2">
          <div className="flex flex-col">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "text-left px-3 py-2 hover:bg-muted w-full flex justify-between items-center",
                  selectedTime === time && "bg-muted font-medium"
                )}
              >
                {time}
                {selectedTime === time && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          {/* <Button onClick={handleConfirm} disabled={!selectedTime}>
            Schedule Session
          </Button> */}
          <HandleServerAction
            submitFunction={createSession}
            btnText="Schedule Session"
            loadingBtnText="Creating Session"
            onSuccess={(data) => setSessionURL(data)}
          >
            <input type="hidden" name="courseCode" value={courseCode} />
            <input type="hidden" name="facultyId" value={facultyId} />
            <input type="hidden" name="startTime" value={selectedTime} />
          </HandleServerAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
