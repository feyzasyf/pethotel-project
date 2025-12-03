import AuthForm from "@/components/AuthForm";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function Login() {
  return (
    <main>
      <Heading className="text-center mb-6">Log in</Heading>
      <AuthForm />
      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link className="font-medium" href="/signup">
          Sign up
        </Link>
      </p>
    </main>
  );
}
