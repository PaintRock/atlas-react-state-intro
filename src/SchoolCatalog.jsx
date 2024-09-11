import React, { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [courses, setCoursesNameFilter] = useState("");
  const [courses, setCoursesNumberFilter] = useState("");
  
  useEffect (() => {
    fetch('/api/courses.json')
    .then((response) => response.json())
    .then((data => setCourses(data)));
  }, []);
  
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" onChange = {(e) => setCoursesNameFilter(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
          <tr key={course.courseNumber}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
          // <tr>
          //   <td>1</td>
          //   <td>PP1100</td>
          //   <td>Basic Procedural Programming</td>
          //   <td>4</td>
          //   <td>50</td>
          //   <td>
          //     <button>Enroll</button>
          //   </td>
          // </tr>
          // <tr>
          //   <td>1</td>
          //   <td>OS1000</td>
          //   <td>Fundamentals of Open Source Operating Systems</td>
          //   <td>2.5</td>
          //   <td>37.5</td>
          //   <td>
          //     <button>Enroll</button>
          //   </td>
          // </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
