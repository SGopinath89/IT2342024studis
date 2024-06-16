import { useState } from "react";
import UpdateUser from "../components/user/UpdateUser";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../redux/slices/api/userApiSlice";
import { dateFormatter } from "../utils";
import { ReactSVG } from 'react-svg';
import defaultProfilePic from '../assets/profile_default.svg';

//shows user details
const Profile = () => {
  //get current user
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  
  //call user details query
  const { data, isLoading } = useGetUserQuery({ 
    id: user._id 
  });

  if (isLoading) return <p>Loading...</p>;

  //saving data geting from query
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

  //format the date of birth properly
  const formattedBirthday = dateFormatter(birthday);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <Button
          onClick={() => setOpen(true)}
          label='Update Profile'
          icon={<IoMdAdd className='text-lg' />}
          className='flex flex-row-reverse gap-1 items-center bg-[#28A745] text-[#F8F9FA] hover:bg-[#1C6B31] rounded-md py-2 2xl:py-2.5'
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className='w-full grid grid-cols-2 gap-4'>
          {profilePic ? (
            <img
              src={profilePic}
              alt='Profile Picture'
              className='w-28 h-28 md:h-36 2xl:h-52 rounded-full object-cover'
            /> 
          ) : (
            <ReactSVG 
            src={defaultProfilePic} 
            className= 'w-28 h-28 md:h-36 2xl:h-52 rounded-full' />
          )}<br/>
          <span>
            <h2 className="text-lg font-semibold">{name}</h2>
            <h3 className="text-[#495057]">{email}</h3>
          </span>
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
