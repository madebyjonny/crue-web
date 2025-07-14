import { useMutation } from "@tanstack/react-query";
import cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-xsrf-token": cookies.get("XSRF-TOKEN") || "",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data);
      }
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    mutate({ email, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input id="email" name="email" type="email" />
        <label>Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">{isPending ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
}
