import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Button from "../components/Button";
import ModalWrapper from "../components/ModalWrapper";
import Textbox from "../components/Textbox";
import { useUpdateMeMutation } from "../redux/slices/api/userApiSlice";
import { app } from "../utils/firebase";
import { BiImages } from "react-icons/bi";

const UpdateUser = ({ open, setOpen, userData }) => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("contact", userData.contact);
      setValue("birthday", userData.birthday ? new Date(userData.birthday).toISOString().split('T')[0] : "");
    }
  }, [userData, setValue]);

  const [updateUser, { isLoading: isUpdating }] = useUpdateMeMutation();
  const [uploading, setUploading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [fileLink,setFileLink] = useState(user?.profilePic || "");

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const onSubmit = async (data) => {
    try {
      if (assets.length > 0) {
        setUploading(true);
        const fileUrl = await uploadFile(assets[0]);
        data.profilePic  = fileUrl;
        setFileLink(fileUrl);
        setUploading(false);
      }

      const updateData = { ...data, _id: userData._id };
      const res = await updateUser({ data: updateData }).unwrap();
      toast.success(res.message);
      
      setTimeout(() => {
        setOpen(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
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
    }
  );
};

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <legend>Update User Details</legend>
            <Textbox
              placeholder= {user?.name}
              type='text'
              name='name'
              label='Name'
              className='w-full rounded'
              register={register("name")}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder={user?.email}
              type='text'
              name='email'
              label='Email'
              className='w-full rounded'
              register={register("email")}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder={user?.contact}
              type='text'
              name='contact'
              label='Contact Number'
              className='w-full rounded'
              register={register("contact")}
              error={errors.contact ? errors.contact.message : ""}
            />
            <Textbox
              placeholder={user?.birthday}
              type='date'
              name='birthday'
              label='Birthday'
              className='w-full rounded'
              register={register("birthday")}
              error={errors.birthday ? errors.birthday.message : ""}
            />
            <div className='w-full flex items-center justify-center mt-4'>
              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <BiImages />
                <span>Add picture</span>
              </label>
            </div>    
            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading || isUpdating ?  (
                <span className='text-sm py-2 text-red-500'>
                  Uploading
                </span>
              ) :(
                <Button
                  type='submit'
                  label='Submit'
                  className='bg-blue-600 text-white rounded'
                />
              )} 
              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
        </form>
      </ModalWrapper>
    </>
  );
};

UpdateUser.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default UpdateUser;
