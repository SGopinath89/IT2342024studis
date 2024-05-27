import { useEffect, useState } from 'react';
import { useGetAllEventsQuery } from '../../redux/slices/api/eventApiSlice';
import Calendar from "./Calender";
import Loading from '../Loader';

const EventView = () => {

  const { data: allEvents, isLoading} = useGetAllEventsQuery({
    isTrashed: "",
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (allEvents && allEvents.events) {
      const formattedEvents = allEvents.events.map(event => ({
        id: event._id,
        title: event.eventName,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        description: event.description,
      }));
      setEvents(formattedEvents);
    }
  }, [allEvents]);

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
        <div>
          <h1>My Calendar</h1>
          <Calendar events={events} />
        </div>
      );
}

export default EventView;