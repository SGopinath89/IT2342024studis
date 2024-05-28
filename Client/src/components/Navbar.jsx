import { MdOutlineSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import NotificationPanel from "./NotificationPanel";
import UserAvatar from "./user/UserAvatar";

//navigation bar
const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-[#E9ECEF] px-4 py-3 2xl:py-4 sticky z-10 top-0 shadow-md'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-[#343A40] block md:hidden'
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] shadow-md flex items-center py-2 px-3 gap-2 rounded-full bg-[#F8F9FA]'>
          <MdOutlineSearch className='text-[#495057] text-xl' />

          <input
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-[#6C757D] text-[#495057]'
          />
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
