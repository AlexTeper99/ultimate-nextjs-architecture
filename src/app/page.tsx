import { UserForm } from "@/components/forms/UserForm";
import UserList from "@/components/page-components/(root)/UserList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <UserForm />

      <Suspense fallback={<div>Loading users...</div>}>
        <UserList />
      </Suspense>
    </main>
  );
}
