import logo from "./assets/logo.png";
import { useCourses } from "./CourseContext";

export default function Header() {

  const { courseCount, enrolledCourses } = useCourses();
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {courseCount}</div>
    </div>
  );
}
