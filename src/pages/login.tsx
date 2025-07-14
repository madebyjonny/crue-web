export default function Login() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    // Here you would typically handle the login logic, e.g., API call
    console.log("Logging in with:", { email, password });

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
      // Handle successful login, e.g., redirect or show a success message
    } else {
      console.error("Login failed:", data);
      // Handle login failure, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input id="email" name="email" type="email" />
        <label>Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
