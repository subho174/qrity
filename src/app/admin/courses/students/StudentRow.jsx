"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAppContext } from "@/src/context/AppContext";

const StudentRow = ({ student }) => {
  const { studentId, setstudentId } = useAppContext();
  if (!student) return null;

  return (
    <TableRow
      key={student._id}
      className={`transition ${
        studentId === student._id ? "bg-background" : ""
      } hover:bg-muted`}
    >
      <TableCell>{student.name}</TableCell>
      <TableCell>{student.email}</TableCell>
      <TableCell>
        <Button
          variant="custom"
          className="mr-6"
          onClick={() => setstudentId(student._id)}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default StudentRow;
