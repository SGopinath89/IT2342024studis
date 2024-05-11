import Notice from "../models/notification.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const createTask = async (req, res) => {
    try {
        const { userId, name } = req.user;

        const { title, stage, priority, assets } = req.body;

        let text = "New task has been created.";

        text = 
            text + 
            ` The task priority is set to ${priority}. The task date is ${new Date(Date.now()).toDateString()}.`;
        
        const activity = {
            type: "assigned",
            activity: text,
            by: userId,
        };

        const task = await Task.create({
            title, 
            stage: stage.toLowerCase(),  
            priority: priority.toLowerCase(), 
            assets,
            activities: activity,
            createdBy: userId,
        });
        
        await Notice.create({
            text,
            task: task._id,
            owner: userId,
        });

        res
            .status(200)
            .json({ status: true, task, message: "Task created successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }

};

export const duplicateTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        const task = await Task.findById(id);

        const newTask = await Task.create({
            title: task.title + " - Duplicate",
            subTasks: task.subTasks,
            assets: task.assets,
            priority: task.priority,
            stage: task.stage,
            createdBy: task.createdBy,
        });

        

        await newTask.save();

        let text = "A task has been duplicated."
        text = 
            text + 
            ` The task priority is set to ${
                newTask.priority
            }. The task date is ${newTask.date.toDateString()}.`;
        
        await Notice.create({
            text,
            task: newTask._id,
            owner: userId,
        });

        res
            .status(200)
            .json({ status: true, message: "Task duplicated successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

//might throw errors because admin non-admin user conflicts
export const dashboardStatistics = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user

        const allTasks = isAdmin
         ? await Task.find({
            isTrashed: false,
         })
            .sort({ _id: -1 })
         : await Task.find({
            isTrashed: false,
         })
            .sort({ _id: -1 });

        const users = await User.find ({iaActive: true})
            .select("name title role isAdmin createdAt")
            .limit(10)
            .sort({ _id: -1 });

        // group task by stage and calculat counts
        const groupTasks = allTasks.reduce((result, task) => {
            const stage = task.stage;

            if(!result[stage]){
                result[stage] = 1
            } else {
                result[stage] += 1;
            }

            return result;
        }, {});

        // group task by priority
        const groupData = Object.entries(
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
            graphData: groupData,
        };

        res.status(200).json({
            status: true,
            message: "Successful",
            ...summary,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { userId } = req.user;
        const { stage, isTrashed } = req.query;

    let query = { 
        createdBy: userId,
        isTrashed: isTrashed ? true : false
    };
    
    if (stage) {
      query.stage = stage;
    }

    let queryResult = Task.find(query)
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
        const { userId } = req.user;
        const {id} = req.params

        const userTasks = await Task.find({ createdBy: userId })
            .sort({ _id: -1 });

        const task = userTasks.find(task => task._id.toString() === id);

        if (!task) {
            return res.status(404).json({ status: false, message: 'Task not found' });
        }

        res.status(200).json({
            status: true,
            task,
        });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const createSubTask = async (req, res) => {
    try {
        const { title, date } = req.body;
        const { id } = req.params;

        const newSubTask = {
            title,
            date,
        };

        const task = await Task.findById(id);

        task.subTasks.push(newSubTask);

        await task.save();

        res
            .status(200)
            .json({ status: true, message: "Subtask added successfully." });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, stage, priority, assets } = req.body;

        const task = await Task.findById(id);

        task.title = title;
        task.date = date;
        task.priority = priority.toLowerCase();
        task.assets = assets;
        task.stage = stage.toLowerCase();

        await task.save();

        res
            .status(200)
            .json({ status: true, message: "Task updated successfully." });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const trashTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        task.isTrashed = true;

        await task.save();

        res
            .status(200)
            .json({ status: true, message: `Task trashed successfully.`,});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if(actionType === "delete"){
            await Task.findByIdAndDelete(id);
        } else if(actionType === "deleteAll"){
            await Task.deleteMany({ isTrashed: true });
        } else if(actionType === "restore"){
            const resp = await Task.findById(id);

            resp.isTrashed = false;
            resp.save();
        } else if(actionType === "restoreAll"){
            await Task.updateMany(
                { isTrashed: true },
                { $set: { isTrashed: false }},
            );
        }

        res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
        });
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