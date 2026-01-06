import { Drawer } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SuccessEmitter } from "../ToastEmitter";
import authContext from "../context/authContext";

function SideBar({ open, setOpen, navigate }) {

  const { setToken, user } = useContext(authContext)

  console.log(user)
  function logoutHandler() {
    localStorage.removeItem('token')
    setToken("")
    navigate('/login')
    setOpen(false);
    SuccessEmitter("Logged out successfully")
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => {
        setOpen(false);
      }}
    >
      <div
        className="bg-gray-100 relative dark:bg-gray-700 h-screen w-[250px]"
        role="presentation"
      >
        <div className="flex flex-col items-center justify-center gap-2 pt-8 w-full">
          <img
            className="h-[100px] w-[100px] object-cover border-2 border-amber-50 rounded-full"
            src={user?.avatar ? user?.avatar : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"}
            alt="loading..."
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">
            {user?.name}
          </h1>
          <h1 className="text-sm text-gray-900 dark:text-gray-100">
            {user?.email}
          </h1>
        </div>
        <ul className="space-y-2 py-4 ">
          <li>
            <Link
              to="/mynotes" onClick={() => {
                setOpen(false);
              }}
              className="block py-2 pl-7 font-semibold text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Your Notes
            </Link>
          </li>
          <li>
            <Link
              to="/profile" onClick={() => {
                setOpen(false);
              }}
              className="block py-2 pl-7 font-semibold text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Profile
            </Link>
          </li>
          <li>
          </li>
          <li className="text-center absolute bottom-10 w-full">
            <Link
              to="/login"
              className="inline-block py-3 px-7 mt-10 font-semibold rounded-sm text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-900"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </Drawer>
  );
}

export default SideBar;
