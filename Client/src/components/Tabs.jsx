import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import PropTypes from 'prop-types';

//classname function for passing complex styles
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

//renders view options visible
export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className='w-full px-1 sm:px-0'>
      <TabGroup>
        <TabList className='flex space-x-6 rounded-xl p-1'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-[#F8F9FA]",

                  selected
                    ? "text-[#28A745]  border-b-2 border-[#1C6B31]"
                    : "text-[#343A40]  hover:text-[#28A745]"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className='w-full mt-2'>{children}</TabPanels>
      </TabGroup>
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.array,  
  selected: PropTypes.string,  
  children: PropTypes.array,  
  setSelected: PropTypes.func,  
};