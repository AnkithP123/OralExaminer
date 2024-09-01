import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

function HomeCards() {
  return (
    <section className="py-8">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-lg">
        <Card bg="bg-[#E6F3FF]" className="w-64 h-80 p-8">
            <h2 className="text-2xl font-bold">Create Room</h2>
            <p className="mt-4 mb-8 text-lg text-gray-800">
              For Teacher Use. Create a room for your students.
            </p>
            <Link
              to="/create-room"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-[#3666a3]"
            >
              Create
            </Link>
          </Card>
          <Card bg="bg-[#E6F3FF]" className="w-64 h-80 p-8">
            <h2 className="text-2xl font-bold">Join Room</h2>
            <p className="mt-4 mb-8 text-lg text-gray-800">
              Join a room created by your teacher.
            </p>
            <Link
              to="/pv"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-[#3666a3]"
            >
              Join
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default HomeCards;