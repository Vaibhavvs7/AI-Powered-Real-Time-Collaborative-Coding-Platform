import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import { initializeSocket, receiveMessage, sendMessage } from "../config/socket";
import { UserContext } from "../context/user.context";

const Project = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);

  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUserId => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if(newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      } 
      return newSelectedUserId;
    });
  };

  useEffect(() => {
    initializeSocket(project._id)

    receiveMessage('project-message', (data) => {
      console.log(data);
    });


    axios.get(`/projects/get-project/${location.state.project._id}`).then((res) => {
      console.log(res.data.project);
      setProject(res.data.project);
    }).catch((err) => {
      console.log(err);
    });


    // Fetch all users from the backend
    axios.get('/users/all').then((res) => {
      setUsers(res.data.users);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const send = () => {
    console.log(user)
    sendMessage('project-message', {
      message,
      sender: user._id
    });
    setMessage("")
  }

  function addCollaborators(){
    axios.put("/projects/add-user",{
      projectId: location.state.project._id,
      users: Array.from(selectedUserId)
    }).then((res) => {
      console.log(res.data);
      setIsModalOpen(false);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">
          <button onClick={() => setIsModalOpen(true)} className="flex gap-2">
            <i className="ri-add-fill mr-1"></i>
            <p>Add Collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>
        <div className="conversation-area flex-grow flex flex-col">
          <div className="message-box flex-grow flex flex-col gap-1 p-1">
            <div className="message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="ml-auto max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="inputField w-full flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 px-4 border-none outline-none flex-grow"
              type="text"
              placeholder="Type a message"
            />
            <button 
              onClick={send}
              className="px-5 bg-slate-900 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>

          <div
            className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${
              isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
            } top-0`}
          >
            <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
              <h1 className="font-semibold text-lg">Collaborators</h1>

              <button
                onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                className="p-2"
              >
                <i className="ri-close-fill"></i>
              </button>
            </header>

            <div className="users flex flex-col gap-2">

              {project.users && project.users.map((user) => {
                return (
                  <div className="user cursor-pointer hover:bg-slate-100 p-2 flex gap-2 items-center">
                <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                  <i className="ri-user-fill absolute"></i>
                </div>
                <h1 className="font-semibold text-lg">{user.email}</h1>
              </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map(user => (
                <div
                  key={user.id}
                  className={`user cursor-pointer hover:bg-slate-200 ${
                    Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;