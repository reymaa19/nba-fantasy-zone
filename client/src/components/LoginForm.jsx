import { useState } from "react";
import userService from "@/services/user";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await userService.login({ username, password });

    if (response.status === 200) {
      window.localStorage.setItem("user", JSON.stringify(response.data));
      //playerService.setToken(result.token);

      setUsername("");
      setPassword("");
    } else {
      setError(result.response.data.error);
    }
  };

  const clearError = () => setError("");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-sm m-auto mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => {
                  clearError();
                  setUsername(e.target.value);
                }}
                placeholder="username"
                required
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  clearError();
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
      {error && (
        <Alert variant="destructive" className="w-full max-w-sm m-auto mt-4">
          <AlertCircle className="h-4 w-4 " />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
