import { useQueryClient } from "@tanstack/react-query";

type DashboardProps = {
  name: string;
  organisations: { id: string; name: string }[];
};

export default function Dashboard() {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(["me"]) as DashboardProps;

  return (
    <div>
      <h1>Dashboard</h1>

      {cachedData && <p>Welcome, {cachedData.name}!</p>}

      <h2>Subscriptions</h2>

      <h2>My Organisations</h2>
      {cachedData.organisations && cachedData.organisations.length > 0 ? (
        <ul>
          {cachedData.organisations.map(
            (org: DashboardProps["organisations"][0]) => (
              <li key={org.id}>{org.name}</li>
            )
          )}
        </ul>
      ) : (
        <p>No organisations found.</p>
      )}
    </div>
  );
}
