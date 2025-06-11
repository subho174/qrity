"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseCard from "./CourseCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PAGE_SIZE = 4;

export default function OptedCourses({ optedCourses = [] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(optedCourses.length / PAGE_SIZE);
  const paginatedCourses = optedCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <section className="mx-auto my-20 space-y-6 w-84 md:w-auto 2xl:m-0 ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ongoing Courses</h2>
        <Badge variant="outline">
          Page {totalPages ? page : 0} of {totalPages}
        </Badge>
      </div>

      {paginatedCourses.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground border-1">
          <CardTitle>No Courses Found</CardTitle>
          <p className="text-sm">You haven't opted for any courses yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2 gap-x-8 gap-y-6">
          {paginatedCourses.map((course, i) => (
            <CourseCard
              key={i}
              course={{ ...course, _id: course._id.toString() }}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={handlePrev} disabled={page === 1} variant="custom">
            <ArrowLeft />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={page === totalPages}>
            Next <ArrowRight />
          </Button>
        </div>
      )}
    </section>
  );
}
