import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import PropTypes from 'prop-types';
import { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

//for viewing dropdown boxes
const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className='w-full'>
      {label && <p className='text-[#343A40] dark:text-[#F8F9FA]'>{label}</p>}

      <Listbox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <ListboxButton className='relative w-full cursor-default rounded bg-[#F8F9FA] pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
            <span className='block truncate'>{selected}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <BsChevronExpand
                className='h-5 w-5 text-[#6C757D]'
                aria-hidden='true'
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#F8F9FA] py-1 text-base shadow-lg ring-1 ring-[#F8F9FA] focus:outline-none sm:text-sm'>
              {lists.map((list, index) => (
                <ListboxOption
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-[#FFE082] text-[#C79100]" : "text-[#495057]"
                    }`
                  }
                  value={list}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {list}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#C79100]'>
                          <MdCheck className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

SelectList.propTypes = {
  lists: PropTypes.array,  
  selected: PropTypes.string,  
  label: PropTypes.string,  
  setSelected: PropTypes.func,  
};

export default SelectList;
