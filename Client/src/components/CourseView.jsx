/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import CourseCard from "./CourseCard";
 
const CourseView = ({ courses }) => {
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {courses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
    </div>
  );
};

export default CourseView;
