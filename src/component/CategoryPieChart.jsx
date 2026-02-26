
import { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ExpenseContext } from "../context/ExpenseContext";

function CategoryPieChart() {


 const { transaction }=useContext(ExpenseContext);

  const expenseTransactions = transaction.filter(
    (t) => t.type === "expense"
  );

  const categoryMap = {};

  expenseTransactions.forEach((t) => {
    if (categoryMap[t.category]) {
      categoryMap[t.category] += t.amount;
    } else {
      categoryMap[t.category] = t.amount;
    }
  });

   const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: Math.abs(categoryMap[key]),
  }));

  const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b","#fff"];

  return (
    <div className="  mt-10 mx-2 mb-5 sm:mb-0 sm:mx-10 hover:scale-105 transition-all duration-500  bg-[#14243c] border border-white/5 rounded-2xl p-6 shadow-2xl">
     <h1 className="text-md text-center  text-2xl  sm:text-3xl text-blue-400">Spending By Category</h1>

      <PieChart width={350} height={350}>
        <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        outerRadius={120}
        label
        >
          {pieData.map((entry, index) => (
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