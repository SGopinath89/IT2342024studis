/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Calendar from "./Calender";
import { summary } from '../assets/data';

const EventView = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const formattedEvents = summary.events.map(event => ({
            id: event._id,
            title: event.eventName,
            start: new Date(`${event.date}T${event.startTime}:00`),
            end: new Date(new Date(`${event.date}T${event.startTime}:00`).getTime()+(parseInt(event.duration*60*60*1000))),
            description: event.description,
        }));
        setEvents(formattedEvents);
    }, []);
    return (
        <div>
          <h1>My Calendar</h1>
          <Calendar events={events} />
        </div>
      );
}

export default EventView;