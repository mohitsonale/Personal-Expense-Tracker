
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function CategoryPieChart() {

  const data = [
    { name: "Food", value:400 },
    { name: "Travel", value:100 },
    { name: "Shopping", value:300 },
    { name: "Bills", value: 200 },
  ];

  const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b"];

  return (
    <div className="bg-white p-6 mt-10 mx-2 mb-5 sm:mb-0 sm:mx-10  rounded-xl shadow-md">
     <h1 className="text-md text-center  text-2xl  sm:text-3xl text-blue-400">Spending By Category</h1>

      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default CategoryPieChart;