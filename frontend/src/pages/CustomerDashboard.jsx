import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
function CustomerDashboard() {
  const [data, setData] = useState(null);
  const fetchDashboard = async () => {
    try {
      const response = await API.get("users/customer-dashboard/");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  if (!data) return <h1 className="p-10">Loading...</h1>;
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Customer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StatCard title="Total Orders" value={data.total_orders} />
        <StatCard title="Cart Items" value={data.total_cart_items} />
      </div>
    </div>
  );
}
export default CustomerDashboard;
