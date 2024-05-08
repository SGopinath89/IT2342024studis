import Event from "../models/event.js";
import Notice from "../models/notification.js";

export const createEvent = async (req, res) => {
    try {
        const { userId } = req.user;
        const { eventName, date, startTime, duration, description } = req.body;
        
        const event = await Event.create({
            eventName, 
            date, 
            startTime,
            duration, 
            description,
            createdBy: userId,
        });

        res
            .status(200)
            .json({ status: true, event, message: "Event created successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }

};

export const duplicateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        const newEvent = await Event.create({
            ...event,
            eventName: event.eventName + " - Duplicate",
        });

        newEvent.date = event.date;
        newEvent.startTime = event.startTime;
        newEvent.duration = event.duration;
        newEvent.description = event.description;

        await newEvent.save();

        let text = "New Event has been created,"
        
        await Notice.create({
            text,
            task: newEvent._id,
            createdBy,
        });

        res
            .status(200)
            .json({ status: true, message: "Event duplicated successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getEvents = async (req, res) => {
    try {
        const { userId } = req.user;
        const { isTrashed } = req.query;

        let query = { 
            createdBy: userId,
            isTrashed: isTrashed ? true : false
        };

        let queryResult = Event.find(query)
            .sort({ _id: -1 });

        const events = await queryResult;

        res.status(200).json({
            status: true,
            events,
        });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getEvent = async (req, res) => {
    try {
        const { userId } = req.user;
        const {id} = req.params

        const userEvents = await Event.find({ createdBy: userId })
            .sort({ _id: -1 });

        const event = userEvents.find(event => event._id.toString() === id);

        if (!event) {
            return res.status(404).json({ status: false, message: 'Event not found' });
        }

        res.status(200).json({
            status: true,
            event,
        });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, date, startTime, duration, description } = req.body;

        const event = await Event.findById(id);

        event.eventName = eventName;
        event.date = date;
        event.startTime = startTime;
        event.duration = duration;
        event.description = description;

        await event.save();

        res
            .status(200)
            .json({ status: true, message: "Event updated successfully." });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const trashEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        event.isTrashed = true;

        await event.save();

        res
            .status(200)
            .json({ status: true, message: `Event trashed successfully.`,});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const deleteRestoreEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if(actionType === "delete"){
            await Event.findByIdAndDelete(id);
        } else if(actionType === "deleteAll"){
            await Event.deleteMany({ isTrashed: true });
        } else if(actionType === "restore"){
            const resp = await Event.findById(id);

            resp.isTrashed = false;
            resp.save();
        } else if(actionType === "restoreAll"){
            await Event.updateMany(
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