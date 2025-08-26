// use client
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
// import SignIn from "../lib/actions";
import SignIn from "../lib/actions";
import { ActionResult } from "@/types";

import { useActionState } from "react";

import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: ActionResult = {
  error: "",
};

// komponen loading saat submit button
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex w-full flex-col gap-2">
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Loading..." : "Sign In"}
      </Button>
    </div>
  );
}

export default function FormSignIn() {
  const [state, formAction] = useActionState(SignIn, initialState);
  console.log("State form:", state);
  return (
    <form action={formAction}>
      <Card className="w-full max-w-sm rounded-xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email & password to sign in
          </CardDescription>
          <CardAction className="flex justify-center">
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {state.error !== "" && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to process your Sign In.</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input name="password" id="password" type="password" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <a
            href="#"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
