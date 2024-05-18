import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { Button } from "./Button.jsx";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk/?filter=${filter || ""}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="m-2">
        <input
          value={filter}
          onChange={useCallback((e) => setFilter(e.target.value))}
          type="text"
          placeholder="Search users"
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user.email} />
        ))}
      </div>
    </div>
  );
}

export function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="flex justify-center rounded-full h-12 w-12 bg-slate-200 mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{" "}
            {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button>Send Money</Button>
      </div>
    </div>
  );
}
