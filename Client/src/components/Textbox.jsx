import Reacts from "react";
import clsx from "clsx";

//customized textbox
const Textbox = Reacts.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className='w-full flex flex-col gap-1'>
        {label && (
          <label htmlFor={name} className='text-[#343A40]'>
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-[#6C757D] text-[#495057] outline-none text-base focus:ring-2 ring-[#66B2FF]",
              className
            )}
          />
        </div>
        {error && (
          <span className='text-xs text-[#DC3545] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);
export default Textbox;
