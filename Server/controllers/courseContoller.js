import Course from "../models/course.js";

//for adding courses
export const addCourse = async (req, res) => {
    try {

        //get properties from the request body
        const { courseCode, title, lectureInCharge, duration, courseContent } = req.body;
        
        //create a new course object
        const course = await Course.create({
            courseCode, 
            title, 
            lectureInCharge,
            duration, 
            courseContent,
        });

        res
            .status(200)
            .json({ status: true, course, message: "Course added successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }

};
 
//to get all course details
export const getCourse = async (req, res) => {
    try {
        //value for isTrashed need to be provided to get active courses
        const { isTrashed } = req.query;

        let query = { 
            isTrashed: isTrashed ? true : false
        };

        //get query result
        let queryResult = Course.find(query)
            .sort({ _id: -1 });

        const courses = await queryResult;

        res.status(200).json({ status: true, courses });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

//get a single course
export const getCourseById = async (req, res) => {
    try {
        //provide id parameter
        const { id } = req.params

        //find course by id
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ status: false, message: 'Course not found' });
        }
        res.status(200).json({ status: true, course });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

//update course details
export const updateCourse = async (req, res) => {
    try {
        //get id parameter
        const { id } = req.params;
        //provide data needed to be updated
        const { courseCode, title, lectureInCharge, duration, courseContent } = req.body;

        //fill empty fields with current values
        const updatedFields = {};
        if (courseCode) updatedFields.courseCode = courseCode;
        if (title) updatedFields.title = title;
        if (lectureInCharge) updatedFields.lectureInCharge = lectureInCharge;
        if (duration) updatedFields.duration = duration;
        if (courseContent) updatedFields.courseContent = courseContent;

        //update the document
        const course = await Course.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ status: false, message: 'Course not found' });
        }

        res.status(200).json({ status: true, message: 'Course updated successfully', course });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

//toggle isTrash state of a course
export const trashCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        course.isTrashed = true;

        await course.save();

        res
            .status(200)
            .json({ status: true, message: `Course trashed successfully.`,});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

//delete course document
export const deleteRestoreCourse = async (req, res) => {
    try {
        const { id } = req.params;
        
        await Course.findByIdAndDelete(id);

        res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
        });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};