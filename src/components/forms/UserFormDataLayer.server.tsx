import { fetchUsers } from "@/lib/actions/user.actions";
import React from "react";
import { UserForm } from "./UserForm";

const UserFormDataLayer = async () => {
  const users = await fetchUsers();
  return <UserForm users={JSON.parse(JSON.stringify(users))} />;
};

export default UserFormDataLayer;
