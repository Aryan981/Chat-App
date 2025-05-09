import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { authUser, logout, isLoggingOut } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 backdrop-blur-lg bg-base-100/80 z-10">
      <div className="container mx-auto px-4 h-16 ">
        <div className="flex items-center justify-between h-full">
          <div className="flex justify-center items-center h-full">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-semibold">MingleMate</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
              <Link to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
              >
                <Settings className="w-4 h-4"/>
                <span className="hidden sm:inline">Settings</span>
              </Link>
              {authUser ? (
              <>
                {/* Profile Link (Visible only if logged in) */}
                <Link to="/profile" className="btn btn-sm gap-2 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout Button (Visible only if logged in) */}
                <button
                  onClick={logout}
                  className={`btn btn-sm gap-2 transition-colors ${isLoggingOut ? "loading" : ""}`}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
