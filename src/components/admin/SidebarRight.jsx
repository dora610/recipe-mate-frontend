import React from 'react';
import EventCard from './EventCard';

function SidebarRight() {
  return (
    <div className="bg-slate-100 ">
      <h4 className="bg-purple-700 text-stone-200 px-2 py-2">
        Recent activity
      </h4>
      <div className=" flex flex-col space-y-1 px-2 py-2 max-h-[90vh] overflow-y-auto">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}

export default SidebarRight;
