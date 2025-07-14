import { useMutation } from "@tanstack/react-query";

export default function Login() {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", data);
      }
      return data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
