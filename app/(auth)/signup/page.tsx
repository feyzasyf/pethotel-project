import AuthForm from "@/components/AuthForm";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function SignUp() {
  return (
    <main>
      <Heading className="text-center mb-6">Sign up</Heading>
      <AuthForm type="signUp" />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link className="font-medium" href="/login">
          Log in
        </Link>
      </p>
    </main>
  );
}
