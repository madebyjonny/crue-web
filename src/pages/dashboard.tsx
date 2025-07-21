import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch("/api/me", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
    retry: false,
  });
  if (error || isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Dashboard</h1>

      {data && <p>Welcome, {data.name}!</p>}

      <h2>Subscriptions</h2>

      <h2>My Organisations</h2>
      {data.organisations && data.organisations.length > 0 ? (
        <ul>
          {data.organisations.map((org: any) => (
            <li key={org.id}>{org.name}</li>
          ))}
        </ul>
      ) : (
        <p>No organisations found.</p>
      )}
    </div>
  );
}
