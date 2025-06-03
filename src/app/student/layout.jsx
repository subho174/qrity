import { StudentNavbar } from "../../components/StudentNavbar";

export default function StudentLayout({ children }) {
  return (
    <>
      <StudentNavbar />
      {children}
    </>
  );
}