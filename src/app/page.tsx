import { UserForm } from "@/components/forms/UserForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <UserForm />
    </main>
  );
}
