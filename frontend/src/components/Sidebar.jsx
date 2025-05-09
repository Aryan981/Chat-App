import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, LayoutGrid, Filter } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter users based on online status and search query
  const filteredUsers = users
    .filter(user => !showOnlineOnly || onlineUsers.includes(user._id))
    .filter(user => 
      searchQuery === "" || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-300 bg-base-100">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Users className="size-5 text-primary" />
            </div>
            <h2 className="font-medium text-lg hidden lg:block">Contacts</h2>
          </div>
          <div className="hidden lg:flex gap-1">
            {/* <button className="btn btn-sm btn-ghost btn-circle" title="View as grid">
              <LayoutGrid className="size-4" />
            </button> */}
            <button 
              className={`btn btn-sm ${showOnlineOnly ? 'btn-primary' : 'btn-ghost'} btn-circle`}
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
              title="Show online only"
            >
              <Filter className="size-4" />
            </button>
          </div>
        </div>
        
        {/* Search - only visible on larger screens */}
        <div className="hidden lg:block relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-sm input-bordered w-full pl-9 focus:outline-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-base-content/50" />
        </div>
        
        {/* Online filter toggle - visible on larger screens */}
        <div className="hidden lg:flex items-center justify-between text-sm">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="badge badge-sm">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-base-content/50 py-8 px-4">
            <Filter className="size-10 mb-2 opacity-40" />
            <p className="text-center">
              {searchQuery ? "No matching contacts found" : "No online contacts available"}
            </p>
            {showOnlineOnly && (
              <button 
                onClick={() => setShowOnlineOnly(false)}
                className="btn btn-sm btn-ghost mt-2"
              >
                Show all contacts
              </button>
            )}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full px-4 py-3 flex items-center gap-3
                hover:bg-base-200 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-200 border-l-4 border-primary" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <div className="size-12 rounded-full overflow-hidden border border-base-300">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-12 object-cover"
                  />
                </div>
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-base-100"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${onlineUsers.includes(user._id) ? "bg-green-500" : "bg-gray-300"}`}></span>
                  <span className="text-sm text-base-content/60 truncate">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              
              {/* Last active time - only visible on larger screens when selected */}
              {selectedUser?._id === user._id && (
                <div className="hidden lg:block text-xs text-base-content/50">
                  {onlineUsers.includes(user._id) ? "Active now" : ""}
                </div>
              )}
            </button>
          ))
        )}
      </div>
      
      {/* Footer with info - only on larger screens */}
      <div className="hidden lg:block p-4 border-t border-base-300 text-xs text-center text-base-content/50">
        {users.length} contacts • {onlineUsers.length - 1} online
      </div>
    </aside>
  );
};

export default Sidebar;