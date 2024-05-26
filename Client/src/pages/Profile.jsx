import { useState } from "react";
import UpdateUser from "../components/UpdateUser";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../redux/slices/api/userApiSlice";
import { dateFormatter } from "../utils";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  
  const { data, isLoading } = useGetUserQuery({ 
    id: user._id 
  });

  if (isLoading) return <p>Loading...</p>;

  const { 
    name, 
    email, 
    regNumber, 
    degree, 
    contact, 
    birthday, 
    academicBatch, 
    profilePic 
  } = data;

  const formattedBirthday = dateFormatter(birthday);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <Button
          onClick={() => setOpen(true)}
          label='Update Profile'
          icon={<IoMdAdd className='text-lg' />}
          className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className='w-full grid grid-cols-2 gap-4'>
          <img
            src={profilePic}
            alt='Profile Picture'
            className='w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50'
          />       
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">User Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Registration Number:</p>
            <p>{regNumber}</p>
          </div>
          <div>
            <p className="font-medium">Degree:</p>
            <p>{degree}</p>
          </div>
          <div>
            <p className="font-medium">Contact Number:</p>
            <p>{contact}</p>
          </div>
          <div>
            <p className="font-medium">Birthday:</p>
            <p>{formattedBirthday}</p>
          </div>
          <div>
            <p className="font-medium">Academic Batch:</p>
            <p>{academicBatch}</p>
          </div>
        </div>
      </div>
      <UpdateUser open={open} setOpen={setOpen} userData={data} />
    </div>
  );
};

export default Profile;
