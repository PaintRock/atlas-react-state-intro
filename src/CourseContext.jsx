import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    console.log('Enrolling course:', course);  // Add this line
    setEnrolledCourses([...enrolledCourses, course]);
};

  const dropCourse = (courseNumber) => {
    setEnrolledCourses(enrolledCourses.filter(
        course => course.courseNumber !== courseNumber
    ));
  };

  return (
    <CourseContext.Provider value={{ 
        enrolledCourses, 
        enrollCourse,
        dropCourse,
        courseCount: enrolledCourses.length
         }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
    return useContext(CourseContext);
}
