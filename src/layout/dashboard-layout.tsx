import { Outlet, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

export default function DashboardLayout() {
  const navigate = useNavigate();
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
    navigate("/login");
    return null;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
