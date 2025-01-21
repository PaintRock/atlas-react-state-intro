import React, { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [courseFilter, setCourseFilter] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
  useEffect(() => {
    fetch('/api/courses.json')
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredCourses = [...courses]
    .sort((a, b) => {
      if (!sortColumn) return 0;
      
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];
      
      if (['semesterCredits', 'totalClockHours'].includes(sortColumn)) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    })
    .filter((course) => 
      course.courseName.toLowerCase().includes(courseFilter.toLowerCase()) ||
      course.courseNumber.toLowerCase().includes(courseFilter.toLowerCase())
    );
  
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input 
        type="text" 
        placeholder="Search" 
        onChange={(e) => setCourseFilter(e.target.value)} 
        value={courseFilter}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('trimester')}>Trimester</th>
            <th onClick={() => handleSort('courseNumber')}>Course Number</th>
            <th onClick={() => handleSort('courseName')}>Course Name</th>
            <th onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredCourses.map((course) => (
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
}
