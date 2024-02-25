import { UserForm } from "@/components/forms/UserForm";
import ExtraInfo from "@/components/page-components/(root)/ExtraInfo.component";
import UserList from "@/components/page-components/(root)/UserList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <UserForm />

      <Suspense
        fallback={<div className="bg-red-600 h-44">Loading users...</div>}
      >
        <UserList />
      </Suspense>

      <Suspense
        fallback={
          <div className="text-xl mt-11 bg-orange-300">Loading users...</div>
        }
      >
        <ExtraInfo />
      </Suspense>
    </main>
  );
}
