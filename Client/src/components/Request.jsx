import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import { toast } from 'sonner';
import Button from './Button';
import Textbox from './Textbox';
import { useRequestPasswordResetMutation } from '../redux/slices/api/userApiSlice';

const Request = ({ isOpen, onClose }) => {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm();

    const [requestPasswordReset] = useRequestPasswordResetMutation();

    const onSubmit = async (data) => {
        console.log('Form data:', data);
        try {
            await requestPasswordReset(data).unwrap();
            toast.success('Password reset request sent!');
            reset();
            onClose();
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || 'Failed to send request.');
        }
    }

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
          <Textbox
            placeholder='Your Name'
            name='name'
            label='Name'
            register={register("name", { required: "Name is required!" })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder='email@example.com'
            type='email'
            name='email'
            label='Email Address'
            register={register("email", { required: "Email Address is required!" })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder='Your Registration Number'
            name='regNumber'
            label='Registration Number'
            register={register("regNumber", { required: "Registration Number is required!" })}
            error={errors.regNumber ? errors.regNumber.message : ""}
          />
          <div className='flex justify-end gap-x-4'>
            <Button
              type='button'
              label='Cancel'
              className='bg-gray-500 text-white rounded-full'
              onClick={onClose}
            />
            <Button
              type='submit'
              label='Request'
              className='bg-blue-500 text-white rounded-full'
            />
          </div>
        </form>
      </div>
    </div>
    )
};

Request.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Request;