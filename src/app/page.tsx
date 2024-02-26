import { UserForm } from "@/components/forms/UserForm";
import ExtraInfo from "@/components/page-components/(root)/ExtraInfo.component";
import { fetchUsers } from "@/lib/actions/user.actions";
import { Suspense } from "react";

export default async function Home() {
  const users = await fetchUsers();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <UserForm users={JSON.parse(JSON.stringify(users))} />

      <Suspense
        fallback={
          <div className="text-xl mt-11 bg-orange-300">
            Loading Extra info...
          </div>
        }
      >
        <ExtraInfo />
      </Suspense>
    </main>
  );
}
