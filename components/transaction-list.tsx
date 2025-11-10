"use client"

import { useState, useMemo } from "react"
import type { Transaction } from "@/app/page"

interface TransactionListProps {
  transactions: Transaction[]
  onDeleteTransaction: (id: string) => void
}

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category))
    return Array.from(cats).sort()
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType)
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((t) => t.category === filterCategory)
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case "date-desc":
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "date-asc":
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "amount-desc":
        sorted.sort((a, b) => b.amount - a.amount)
        break
      case "amount-asc":
        sorted.sort((a, b) => a.amount - b.amount)
        break
    }

    return sorted
  }, [transactions, filterType, filterCategory, sortBy])

  const handleExportCSV = () => {
    const headers = ["Date", "Type", "Category", "Amount", "Notes"]
    const rows = filteredTransactions.map((t) => [
      t.date,
      t.type.charAt(0).toUpperCase() + t.type.slice(1),
      t.category,
      t.amount.toFixed(2),
      t.notes || "",
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filters & Export</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleExportCSV}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Notes</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm font-medium">{transaction.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold">
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.notes || "-"}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors text-sm font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
