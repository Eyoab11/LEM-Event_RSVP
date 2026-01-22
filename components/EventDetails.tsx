'use client';

import { EventData } from './RSVPForm';
import { CapacityStatus } from './CapacityStatus';

interface EventDetailsProps {
  eventData: EventData;
}

export function EventDetails({ eventData }: EventDetailsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="premium-glass rounded-3xl p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Event Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-2">When</h3>
            <p className="text-2xl md:text-3xl font-light text-white mb-2">
              {formatDate(eventData.eventDate)}
            </p>
            <p className="text-xl text-amber-300 font-medium">
              {formatTime(eventData.eventStartTime)} - {formatTime(eventData.eventEndTime)}
            </p>
          </div>

          <div>
            <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-2">Where</h3>
            <p className="text-xl md:text-2xl font-light text-white mb-2">
              {eventData.venue.name}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {eventData.venue.address}<br />
              {eventData.venue.city}, {eventData.venue.state} {eventData.venue.zipCode}
            </p>
          </div>

          <div>
            <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-2">Dress Code</h3>
            <p className="text-xl text-white font-medium">
              {eventData.dressCode}
            </p>
          </div>
        </div>

        {/* Capacity and Registration Status */}
        <div className="space-y-6">
          <div>
            <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-4">Availability</h3>
            <CapacityStatus 
              currentRegistrations={eventData.currentRegistrations}
              capacity={eventData.capacity}
            />
          </div>

          {/* Event Description */}
          <div>
            <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-2">About</h3>
            <p className="text-gray-300 leading-relaxed">
              {eventData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}