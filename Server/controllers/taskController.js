import Notice from "../models/notification.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const createTask = async (req, res) => {
    try {
        const { title, team, stage, date, priority, assets } = req.body;

        const task = await Task.create({
            title, 
            team, 
            stage: stage.toLowerCase(), 
            date, 
            priority: priority.toLowerCase(), 
            assets
        });
        let text = "New task has been assigned to you"
        if(task.team.length > 1){
            text = text + ` and ${task.team.length - 1} others`;
        }
        text = 
            text + 
            ` the task priority is set a ${
                task.priority
            } priority. The task date is ${task.date.toDateString()}.`;
        
        await Notice.create({
            team,
            text,
            task: task._id,
        });

        res
            .status(200)
            .json({ status: true, message: "Task created successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }

};

export const duplicateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        const newTask = await Task.create({
            ...task,
            title: task.title + " - Duplicate",
        });

        newTask.team = task.team;
        newTask.subTasks = task.subTasks;
        newTask.assets = task.assets;
        newTask.priority = task.priority;
        newTask.stage = task.stage;

        await newTask.save();

        let text = "New task has been assigned to you"
        if(newTask.team.length > 1){
            text = text + ` and ${newTask.team.length - 1} others`;
        }
        text = 
            text + 
            ` the task priority is set a ${
                newTask.priority
            } priority. The task date is ${newTask.date.toDateString()}.`;
        
        await Notice.create({
            team,
            text,
            task: newTask._id,
        });

        res
            .status(200)
            .json({ status: true, message: "Task duplicated successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const postTaskActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { type, activity } = req.body;

        const task = await Task.findById(id);

        const data = {
            type,
            activity,
            by: userId,
        };

        task.activities.push(data);

        await task.save();

        res
            .status(200)
            .json({ status: true, message: "Activity posted successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const dashboardStatistics = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user

        const allTasks = isAdmin
         ? await Task.find({
            isTrashed: false,
         })
            .populate({
                path: "team",
                select: "name role title email",
            })
            .sort({ _id: -1 })
         : await Task.find({
            isTrashed: false,
            team: { $all: [userId] },
         })
            .populate({
                path: "team",
                select: "name role title email",
            })
            .sort({ _id: -1 });

        const users = await User.find ({iaActive: true})
            .select("name title role isAdmin createdAt")
            .limit(10)
            .sort({ _id: -1 });

        // group task by stage and calculat counts
        const groupTasks = allTasks.reduce((result, task) => {
            const tage = task.stage;

            if(!result[stage]){
                result[stage] = 1
            } else {
                result[stage] += 1;
            }

            return result;
        }, {});

        // group task by priority
        const groupData = object.entries(
            allTasks.reduce((result, task) => {
                const {priority} = task

                result[priority] = (result[priority] || 0) + 1;

                return result;
            }, {})
            ).map(([name, total]) => ({ name, total }));

        //calculate total tasks

        const totalTasks = allTasks?.length;
        const last10Task = allTasks?.slice(0, 10);

        const summary = {
            totalTasks, 
            last10Task, 
            users: isAdmin ? users : [],
            tasks: groupTasks,
            groupData: groupData,
        };

        res.status(200).json({
            status: true,
            message: "Successful",
            ...summary,
        })

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { stage, isTrashed } = req.query;

        let query = { isTrashed: isTrashed ? true : false };

        if (stage) {
            query.stage = stage;
        }

        let queryResult = Task.find(query)
            .populate({
                path: "team",
                select: "name title email",
            })
            .sort({ _id: -1 });

        const tasks = await queryResult;

        res.status(200).json({
            status: true,
            tasks,
        });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const {id} = req.params

        const task = await Task.findById(id)
            .populate({
                path: "team",
                select: "name title role email",
            })
            .populate({
                path: "activities.by",
                select: "name",
            })
            .sort({ _id : -1 });

        res.status(200).json({
            status: true,
            task,
        })
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

// export const  = async (req, res) => {
//     try {

//     } catch (error) {
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };