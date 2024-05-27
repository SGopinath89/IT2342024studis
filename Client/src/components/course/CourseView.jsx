import CourseCard from "./CourseCard";
import PropTypes from 'prop-types';
 
//feeds data to course card
const CourseView = ({ courses }) => {
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {courses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
    </div>
  );
};


//propTypes for this file
CourseView.propTypes = {
  courses: PropTypes.array
};

export default CourseView;
