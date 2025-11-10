"use client"

import { useMemo } from "react"
import type { Transaction, Category } from "@/app/page"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

interface DashboardProps {
  transactions: Transaction[]
  categories: Category[]
  onExport?: () => void
}

export function Dashboard({ transactions, categories, onExport }: DashboardProps) {
  const stats = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    return { income, expenses, balance: income - expenses }
  }, [transactions])

  const monthlyData = useMemo(() => {
    const data: { [key: string]: { income: number; expense: number } } = {}

    transactions.forEach((t) => {
      const month = t.date.substring(0, 7) // YYYY-MM
      if (!data[month]) {
        data[month] = { income: 0, expense: 0 }
      }
      if (t.type === "income") {
        data[month].income += t.amount
      } else {
        data[month].expense += t.amount
      }
    })

    return Object.entries(data)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, values]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        income: values.income,
        expense: values.expense,
      }))
  }, [transactions])

  const categoryBreakdown = useMemo(() => {
    const breakdown: { [key: string]: number } = {}
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount
      })

    return Object.entries(breakdown).map(([name, value]) => ({
      name,
      value,
      color: categories.find((c) => c.name === name)?.color || "#3b82f6",
    }))
  }, [transactions, categories])

  const handleExportSummary = () => {
    const csv = [
      ["Finance Tracker Report", new Date().toLocaleDateString()],
      [],
      ["Summary Statistics"],
      ["Total Income", `$${stats.income.toFixed(2)}`],
      ["Total Expenses", `$${stats.expenses.toFixed(2)}`],
      ["Balance", `$${stats.balance.toFixed(2)}`],
      [],
      ["Monthly Data"],
      ["Month", "Income", "Expense"],
      ...monthlyData.map((m) => [m.month, `$${m.income.toFixed(2)}`, `$${m.expense.toFixed(2)}`]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `finance-report_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Overview</h2>
        <button
          onClick={handleExportSummary}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8H3m0 0h18"
            />
          </svg>
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-muted-foreground mb-2 font-medium">Total Income</div>
          <div className="text-3xl font-bold text-green-600">${stats.income.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-2">From all sources</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-muted-foreground mb-2 font-medium">Total Expenses</div>
          <div className="text-3xl font-bold text-red-600">${stats.expenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-2">All expenses combined</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-muted-foreground mb-2 font-medium">Balance</div>
          <div className={`text-3xl font-bold ${stats.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${stats.balance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-2">{stats.balance >= 0 ? "Surplus" : "Deficit"}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  formatter={(value: any) => `$${value.toFixed(2)}`}
                />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
                <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-muted-foreground">No data available</div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
          {categoryBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-muted-foreground">No expenses yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
