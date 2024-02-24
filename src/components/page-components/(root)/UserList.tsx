import { fetchUsers } from "@/lib/actions/user.actions";
import { UserType } from "@/lib/models/user.model";
import React from "react";

const UserList: React.FC = async () => {
  const users = await fetchUsers();
  return (
    <div className="pt-10">
      {users && users.map(({ username, id }) => <h2 key={id}>{username}</h2>)}
    </div>
  );
};

export default UserList;
