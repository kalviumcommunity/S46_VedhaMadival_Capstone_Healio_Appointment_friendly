import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetAuthenticated } from "../../Redux/AuthenticateReducer";
import bin from "../../Assets/trash.png";

function Notifications() {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(SetAuthenticated());
    }
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-0 font-poppins">
      <div className="flex flex-col py-4">
        <div className="flex items-center justify-between font-poppins">
          <div className="font-bold text-2xl">Healio+</div>
          <div>
            <Link to="/Profile">
              <button className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 text-sm rounded">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center font-poppins">
        <div>
        <h1 className="font-poppins font-bold text-2xl my-6 text-left">
          Notifications
        </h1>
        </div>

        <div>
          {" "}
          <p>Still Working on this</p>
          <h1> SEE YOU SOON </h1>
        </div>
      </div>

      {/* <div>
        <Tabs
          aria-label="tabs with underline"
          style="underline"
          className="active rounded-t-lg border-[#37BFC4] text-[#37BFC4] dark:border-[#267c7e] dark:text-[#267c7e]"
        >
          <Tabs.Item title="Unread Notifications">
            <div className="text-black">
              {data.unseenNotifications &&
                data.unseenNotifications.map((notification, index) => (
                  <div className="w-full" key={index}>
                    <div className="flex flex-row items-center justify-between p-4 border border-slate-500 h-[80%] rounded-lg mt-2 mb-2">
                      <div>
                        <span className="font-poppins text-base h-full">
                          {notification.message}
                        </span>
                      </div>
                      <div>
                        <img src={bin} alt="delete" className="h-4 ml-4" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Tabs.Item>

          <Tabs.Item title="Read Notifications">
            <div className="text-black">
              <div className="w-full">
                <div className="p-2 border border-slate-500 h-[80%] rounded-lg">
                  <span className="font-poppins text-base h-full">
                    All your users are filtered here
                  </span>
                </div>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div> */}
    </div>
  );
}

export default Notifications;
