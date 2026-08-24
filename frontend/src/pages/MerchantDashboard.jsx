import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
function MerchantDashboard() {
  const [data, setData] = useState(null);
  const fetchDashboard = async () => {
    try {
      const response = await API.get("users/merchant-dashboard/");
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
      <h1 className="text-4xl font-bold mb-10">Merchant Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StatCard title="Total Products" value={data.total_products} />
        <StatCard title="Total Sales" value={`₹ ${data.total_sales}`} />
      </div>
    </div>
  );
}
export default MerchantDashboard;
