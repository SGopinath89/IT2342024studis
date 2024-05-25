/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { toast } from "sonner";
import { app } from "../../utils/firebase.js";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useAddFileMutation, useRenameFileMutation } from "../../redux/slices/api/filesApiSlice";
import Loading from "../Loader.jsx";

const AddFile = ({ open, setOpen, fileData }) => {

    const defaultValues = {
        _id: fileData?._id || "",
        fileName: fileData?.fileName || "",
        dateAdded: fileData?.dateAdded || "",
        file: fileData?.file || "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
        setFileLink(fileData?.file || "");
    }, [fileData, reset]);

    const [assets, setAssets] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [fileLink, setFileLink] = useState(fileData?.file || "");

    const dispatch = useDispatch();
    const [addNewFile, { isLoading }] = useAddFileMutation();
    const [renameFile, { isLoading: isUpdating }] = useRenameFileMutation();

    const submitHandler = async (data) => {
        try {
            if (assets.length > 0) {
                setUploading(true);
                const fileUrl = await uploadFile(assets[0]);
                data.file = fileUrl;
                setFileLink(fileUrl);
                setUploading(false);
            }
  
            const res = data._id
                ? await renameFile({ id: data._id, data }).unwrap()
                : await addNewFile(data).unwrap();
            toast.success(res.message);
            setTimeout(() => {
                setOpen(false);
                window.location.reload();
            }, 500);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleSelect = (e) => {
        setAssets(e.target.files);
    };

    const uploadFile = async (file) => {
        const storage = getStorage(app);
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log("Uploading");
                },
                (error) => {
                    console.error("Error uploading file:", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            console.error("Error getting download URL:", error);
                            reject(error);
                        });
                }
            );
        });
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    {fileData ? "UPDATE File" : "ADD NEW File"}
                </DialogTitle>

                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox
                        placeholder='File Name'
                        type='text'
                        name='fileName'
                        label='File Name'
                        className='w-full rounded'
                        register={register("fileName", { required: "File name is required" })}
                        error={errors.fileName ? errors.fileName.message : ""}
                    />

                    <div className='w-full flex items-center justify-center mt-4'>
                        <label
                            className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                            htmlFor='fileUpload'
                        >
                            <input
                                type='file'
                                className='hidden'
                                id='fileUpload'
                                onChange={(e) => handleSelect(e)}
                                accept='.pdf'
                            />
                            <BiImages />
                            <span>Add File</span>
                        </label>
                    </div>
                    {fileLink && (
                        <div className='text-sm text-gray-700 mt-2'>
                            Uploaded File: <a href={fileLink} target='_blank' rel='noopener noreferrer'>{fileLink}</a>
                        </div>
                    )}
                    {uploading && (
                        <div className='text-sm text-gray-700 mt-2'>
                            Uploading file, please wait...
                        </div>
                    )}
                    {isLoading || isUpdating ? (
                        <div className='py-5'>
                            <Loading />
                        </div>
                    ) : (
                        <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
                            <Button
                                label="Submit"
                                type="submit"
                                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                            />
                            <Button
                                type="button"
                                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                                onClick={() => setOpen(false)}
                                label="Cancel"
                            />
                        </div>
                    )}
                </div>
            </form>
        </ModalWrapper>
    );
};

export default AddFile;
