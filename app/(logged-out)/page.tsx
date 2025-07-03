import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <PersonStandingIcon size={50} className="text-pink-500" /> SupportMe
      </h1>
      <p>The Best Dashborad To Manage Customer Support</p>
      <div className="flex gap-2 items-center ">
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <small>Or</small>
        <Button asChild variant="outline">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </>
  );
}
