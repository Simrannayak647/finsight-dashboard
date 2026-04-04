import {
  LineChart, Line, XAxis,
  YAxis, Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area
} from "recharts";

export default function BalanceChart({ view, setView, weeklyData, monthlyData }) {
  const data = view === "weekly" ? weeklyData : monthlyData;

  // Custom tooltip for better visuals
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-100">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="text-lg font-bold text-blue-600">
            ${payload[0].value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Balance Trend</h3>
          <p className="text-xs text-gray-500 mt-0.5">Account balance over time</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setView("weekly")}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              view === "weekly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              view === "monthly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="px-2 pb-4 pt-2">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e5e7eb"
              vertical={false}
            />

            {/* Axes */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 400 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              width={60}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" }} />

            {/* Area Fill (under the line) */}
            <Area
              type="monotone"
              dataKey="balance"
              stroke="none"
              fill="url(#balanceGradient)"
              fillOpacity={1}
            />

            {/* Main Line */}
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: "#3b82f6", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
              smooth
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Optional subtle note */}
      <div className="px-6 pb-4 text-right">
        <span className="text-xs text-gray-400">Last {view === "weekly" ? "7 days" : "6 months"} trend</span>
      </div>
    </div>
  );
}