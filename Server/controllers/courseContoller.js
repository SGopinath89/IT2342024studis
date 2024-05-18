import Course from "../models/course.js";

export const addCourse = async (req, res) => {
    try {

        const { courseCode, title, lectureInCharge, duration, courseContent } = req.body;
        
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
 
export const getCourse = async (req, res) => {
    try {
        const { isTrashed } = req.query;
        let query = { 
            isTrashed: isTrashed ? true : false
        };
        let queryResult = Course.find(query)
            .sort({ _id: -1 });

        const courses = await queryResult;

        res.status(200).json({ status: true, courses });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ status: false, message: 'Course not found' });
        }
        res.status(200).json({ status: true, course });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseCode, title, lectureInCharge, duration, courseContent } = req.body;

        const updatedFields = {};
        if (courseCode) updatedFields.courseCode = courseCode;
        if (title) updatedFields.title = title;
        if (lectureInCharge) updatedFields.lectureInCharge = lectureInCharge;
        if (duration) updatedFields.duration = duration;
        if (courseContent) updatedFields.courseContent = courseContent;

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

export const deleteRestoreCourse = async (req, res) => {
    try {
        const { id } = req.params;
        // const { actionType } = req.query;
        await Course.findByIdAndDelete(id);
        // if(actionType === "delete"){
        //     await Course.findByIdAndDelete(id);
        // } else if (actionType === "deleteAll"){
        //     await Course.deleteMany({ isTrashed: true });
        // }

        res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
        });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};