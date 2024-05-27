import { DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { useChangePasswordMutation } from '../../redux/slices/api/userApiSlice';
import Button from '../Button';
import PropTypes from 'prop-types';
import Loading from '../Loader';
import ModalWrapper from '../ModalWrapper';
import Textbox from '../Textbox';

//change password
const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //call mutation
    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

    //handles password changing
    const handleOnSubmit = async (data) => {
        //checks passwords match
        if (data.password !== data.cpass) {
            toast.warning("Passwords doesn't match");
            return;
        }
        try {
            await changeUserPassword(data).unwrap();
            toast.success("Password changed successfully");

            setTimeout(() => {
                setOpen(false);
            }, 1500);
            
        } catch (err) {
            console.log(err);
            toast.error(err?.date?.message || err.error);
        }
    };

  return (
    <>
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                <DialogTitle as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
                    Change Password
                </DialogTitle>
                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox
                        placeholder='New Password'
                        type='password'
                        name='password'
                        label='New Password'
                        className='w-full rounded'
                        register={register("password", {
                            required: "New Password is required!",
                        })}
                        error={errors.password ? errors.password.message : ""}
                    />
                    <Textbox
                        placeholder='Confirm new Password'
                        type='password'
                        name='cpass'
                        label='Confirm new Password'
                        className='w-full rounded'
                        register={register("cpass", {
                            required: "Confirm new Password is required!",
                        })}
                        error={errors.cpass ? errors.cpass.message : ""}
                    />
                </div>
                {isLoading ? (
                    <div className='py-5'>
                        <Loading />
                    </div>
                ) : (
                    <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                        <Button 
                            type='submit'
                            className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                            label='save'
                        />
                        <button
                            type='button'
                            className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                
            </form>
        </ModalWrapper>
    </>
  )
};

ChangePassword.propTypes = {
    open: PropTypes.bool.isRequired, 
    setOpen: PropTypes.func.isRequired, 
  };

export default ChangePassword