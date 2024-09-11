import React, { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [courseFilter, setCourseFilter] = useState("");
  
  
  useEffect (() => {
    fetch('/api/courses.json')
    .then((response) => response.json())
    .then((data => setCourses(data)));
  }, []);

  const filteredCourses = courses.filter((course) => 
    course.courseName.toLowerCase().includes(courseFilter.toLowerCase()) ||
    course.courseNumber.toLowerCase().includes(courseFilter.toLowerCase())
  );
  
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input 
      type="text" 
      placeholder="Search" 
      onChange = {(e) => setCourseFilter(e.target.value)} 
      value = {courseFilter}
      />
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
          {filteredCourses.map((course) => (
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
      ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
};