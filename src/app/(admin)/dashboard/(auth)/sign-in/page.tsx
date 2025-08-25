import FormSignIn from "./_components/form";

export default function SignInPage() {
  return (
    <main className="w-full h-screen relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 right-1/5 transform -translate-x-1/2 -translate-y-1/2">
        <FormSignIn />
      </div>
    </main>
  );
}
