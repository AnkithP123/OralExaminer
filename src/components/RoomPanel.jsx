import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import { toast } from 'react-toastify';
import { cuteAlert } from 'cute-alert';

function RoomPanel({ roomCode, userId, setRoomCodes }) {
  const [participants, setParticipants] = useState([]);
  const [roomStarted, setRoomStarted] = useState(false);
  const [completedParticipants, setCompletedParticipants] = useState([]);
  const navigate = useNavigate();

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`https://backend-4abv.onrender.com/checkjoined?code=${roomCode}&pin=${userId}`);
      const data = await response.json();
      if(data.error) {
        return;
      }
      console.log(data);
      setParticipants(data.members);
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast.error('Error fetching participants');
    }
    try {
      const response = await fetch(`https://backend-4abv.onrender.com/checkcompleted?code=${roomCode}&pin=${userId}`);
      const data = await response.json();
      if(data.error) {
        return;
      }
      console.log(data);
      setCompletedParticipants(data.members);
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast.error('Error fetching participants');
    }
  };

  useEffect(() => {
    fetchParticipants();
    const intervalId = setInterval(fetchParticipants, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [roomCode]);

  const handleStart = async() => {
    // Logic for starting the event or room
    const response = await fetch(`https://backend-4abv.onrender.com/start_room?code=${roomCode}&pin=${userId}`);
    const data = await response.json();
    console.log(data);
    if(data.code === 404){
      toast.error('Room not found');
      return navigate('/');
    }
    console.log('Start button clicked');
    toast.success('Room started');
    
    document.querySelector('.text-6xl').innerHTML = `<a href="/teacher-portal" class="text-6xl font-bold">Click to go to grading page</a>`;
    setRoomStarted(true);

  };

  const handleRestart = async () => {
    console.log("Old: " + roomCode);
    let everyoneCompleted = true;
    participants.forEach((participant) => {
      if(!completedParticipants.includes(participant)){
        everyoneCompleted = false;
      }
    });

    document.documentElement.style.setProperty('--cute-alert-max-width', document.documentElement.style.getPropertyValue('--cute-alert-min-width') || '20%');
    
    cuteAlert({
      type: everyoneCompleted ? "question" : "error",
      title: "Are you sure?",
      description: "Are you sure you want to administer another question?" + (everyoneCompleted ? "" : "\nNot everyone has finished with the current question."),
      primaryButtonText: "Confirm",
      secondaryButtonText: "Cancel",
      showCloseButton: true,
      closeOnOutsideClick: true,
    }).then(async (event) => {
      if (event === "primaryButtonClicked") {
        const response = await fetch(`https://backend-4abv.onrender.com/restart_room?code=${roomCode}&pin=${userId}`);
        const data = await response.json();
        if(data.error){
          toast.error(data.error);
          return navigate('/');
        }
        setCompletedParticipants([]);
        // in 1 second, do the same
        setTimeout(() => {
          setCompletedParticipants([]);
        }, 1000);
    
        toast.success('Room restarted');
        setRoomCodes(data.newRoomCode);
        roomCode = data.newRoomCode;
        console.log("New: " + roomCode);
        setRoomStarted(true);    
      }
    });
  }

  return (
    <div className="relative flex flex-col items-center" style={{ fontFamily: "Montserrat" }}>
      {/* Participant Count Box and Start Button */}
      <div className="absolute left-4 flex items-center space-x-4">
        <div className="bg-white text-black rounded-lg p-3 shadow-md">
          Participants: {participants.length}
        </div>
      </div>
      <div className="absolute right-4 flex items-center space-x-4">
        <button
          onClick={roomStarted ? handleRestart : handleStart}
          className="bg-red-500 text-white rounded-lg p-3 shadow-md hover:bg-red-600"
        >
          {roomStarted ? 'New Question' : 'Start Room'}
        </button>
      </div>

      <div className="flex items-center justify-center w-screen py-[20px]">
        <span className="text-6xl font-bold">
          Room Code: {roomCode}<br />
        </span>
      </div>
      {/* <div className="flex items-center justify-center w-screen py-[20px]">
        <span className="text-5xl font-bold">
          speakeval.org<br />
        </span>
      </div> */}

      <div className="flex flex-wrap justify-center">
        {completedParticipants.map((participant, index) => (
          <ProfileCard key={index} name={""+participant} code={roomCode} onParticipantRemoved={fetchParticipants} userId={userId} completed={true}/>
        ))}
        {participants.map((participant, index) => (
          completedParticipants.includes(participant) ? null :
          <ProfileCard key={index} name={""+participant} code={roomCode} onParticipantRemoved={fetchParticipants} userId={userId} completed={false}/>
        ))}
      </div>
    </div>
  );
}

export default RoomPanel;
