import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../../index.css";
import AddEvent from './AddEvent.jsx';

const localizer = momentLocalizer(moment);

const Calender = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };  


  return (
    <div className="App w-full">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <AddEvent
          open={open}
          setOpen={setOpen}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

//propTypes for this file
Calender.propTypes = {
  events: PropTypes.array,
};
export default Calender;