import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const RoomChat = (props) => {
  const { socket, room, name } = props;
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    let date = new Date();
    const hours = ((date.getHours() + 11) % 12) + 1;
    const time = `${hours}:${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    } ${date.getHours() >= 12 ? "PM" : "AM"}`;
    socket.emit("chatMessage", { message, name, room, time });
    setMessage("");
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessageList((prevState) => {
        return [...prevState, msg];
      });
    });
  }, [socket]);

  return (
    <>
      <div className="w-full lg:w-8/12 h-10/12 px-4">
        <div className="relative flex flex-col shadow-white min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-blueGray-500 text-lg text-left font-extrabold">{`${room} Room`}</span>
              {/* <span className="float-right bg-green-100 w-1/4 p-3 flex justify-center">
                <img
                  alt="..."
                  className="w-1/6 border-none rounded-lg"
                  src={"./../../../public/assets/img/green.png"}
                />
                <span className="ml-3">Active Users</span>
              </span> */}
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div className="max-h-80 px-6 ">
            <div className="border-black-300 border-2">
              <ScrollToBottom className="h-80">
                {messageList.map((messageData) => {
                  if (messageData.joiningMessage) {
                    console.log(messageData.joiningMessage);
                    const message = `${messageData.joiningMessage.sender} has joined the chat`;
                    return (
                      <h1 className="text-center font-extrabold text-base bg-blue-300 text-black py-2 my-3 mx-5 px-3 rounded-xl">
                        {message}
                      </h1>
                    );
                  }
                  if (messageData.infoMessage) {
                    const message = `${messageData.infoMessage}`;
                    return (
                      <h1 className="text-center font-extrabold text-base bg-blue-300 text-black py-2 my-3 mx-5 px-3 rounded-xl">
                        {message}
                      </h1>
                    );
                  }
                  if (messageData.sender === name) {
                    return (
                      <div className="flex justify-end px-4 lg:px-10 py-2 pt-0">
                        <div className="text-left mt-2 shadow-md text-green-700 shadow-green-500 px-3 py-1 w-fit max-w-sm">
                          <div className="font-extrabold pb-1">
                            {messageData.sender}
                          </div>
                          <span className="text-black text-md">
                            {messageData.text}
                          </span>
                          <div className="text-xs text-right">
                            {messageData.time}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex-auto px-4 lg:px-10 py-2 pt-0">
                        <div className="text-left mt-2 shadow-md text-orange-700 shadow-orange-500 px-3 py-1 w-fit max-w-sm">
                          <div className="font-extrabold pb-1">
                            {messageData.sender}
                          </div>
                          <span className="text-black text-md">
                            {messageData.text}
                          </span>
                          <div className="text-xs text-right">
                            {messageData.time}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </ScrollToBottom>
            </div>
          </div>
          <form className="my-2 mt-4 px-4 lg:px-6" onSubmit={sendMessage}>
            <div className="flex space-x-3">
              <div className="relative w-10/12 mb-3">
                <input
                  type="text"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md outline-none focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="Tpye message here ..."
                />
              </div>
              <div className="text-center w-2/12">
                <button
                  className="text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  style={{ backgroundColor: "#1E293B" }}
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RoomChat;
