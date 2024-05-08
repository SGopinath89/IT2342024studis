import File from "../models/files.js";
import Notice from "../models/notification.js";

export const uploadFile = async (req, res) => {
    try {
        const { userId } = req.user;
        const { fileName, file } = req.body;
        
        const uploadfile = await File.create({
            fileName, 
            file, 
            createdBy: userId,
        });

        res
            .status(200)
            .json({ status: true, uploadfile, message: "File uploaded successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }

};

export const duplicateFile = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        const upload = await File.findById(id);

        const newFile = await File.create({
            fileName: upload.fileName + " - Duplicate",
            dateAdded: upload.dateAdded,
            file: upload.file,
            createdBy: userId,
        });

        await newFile.save();

        let text = "New File has been duplicated."
        
        await Notice.create({
            text,
            task: newFile._id,
            createdBy: userId,
        });

        res
            .status(200)
            .json({ status: true, message: "File duplicated successfully."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getFiles = async (req, res) => {
    try {
        const { userId } = req.user;
        const { isTrashed } = req.query;

        let query = { 
            createdBy: userId,
            isTrashed: isTrashed ? true : false
        };

        let queryResult = File.find(query)
            .sort({ _id: -1 });

        const files = await queryResult;

        res.status(200).json({
            status: true,
            files,
        });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getFile = async (req, res) => {
    try {
        const { userId } = req.user;
        const {id} = req.params

        const userFiles = await File.find({ createdBy: userId })
            .sort({ _id: -1 });

        const upload = userFiles.find(files => files._id.toString() === id);

        if (!upload) {
            return res.status(404).json({ status: false, message: 'File not found' });
        }

        res.status(200).json({
            status: true,
            upload,
        });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const renameFile = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { fileName } = req.body;

        const upload = await File.findById(id);

        upload.fileName = fileName;

        await upload.save();

        res
            .status(200)
            .json({ status: true, message: "File renamed successfully." });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const trashFile = async (req, res) => {
    try {
        const { id } = req.params;

        const upload = await File.findById(id);

        upload.isTrashed = true;

        await upload.save();

        res
            .status(200)
            .json({ status: true, message: `File trashed successfully.`,});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const deleteRestoreFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if(actionType === "delete"){
            await File.findByIdAndDelete(id);
        } else if(actionType === "deleteAll"){
            await File.deleteMany({ isTrashed: true });
        } else if(actionType === "restore"){
            const resp = await File.findById(id);

            resp.isTrashed = false;
            resp.save();
        } else if(actionType === "restoreAll"){
            await File.updateMany(
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