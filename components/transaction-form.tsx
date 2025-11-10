"use client"

import type React from "react"

import { useState } from "react"
import type { Transaction, Category } from "@/app/page"

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void
  categories: Category[]
}

export function TransactionForm({ onAddTransaction, categories }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const filteredCategories = categories.filter((c) => c.type === type)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount greater than 0")
      return
    }

    if (!category) {
      alert("Please select a category")
      return
    }

    onAddTransaction({
      type,
      amount: Number.parseFloat(amount),
      category,
      date,
      notes,
    })

    setSuccessMessage(`✓ ${type === "income" ? "Income" : "Expense"} of $${Number.parseFloat(amount).toFixed(2)} added`)
    setTimeout(() => setSuccessMessage(""), 2000)

    // Reset form
    setAmount("")
    setCategory("")
    setDate(new Date().toISOString().split("T")[0])
    setNotes("")
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Add Transaction</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium animate-pulse">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2">Transaction Type</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setType("expense")
                setCategory("")
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                type === "expense"
                  ? "bg-red-600 text-white shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => {
                setType("income")
                setCategory("")
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                type === "income"
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">Amount *</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            step="0.01"
            min="0"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a category</option>
            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            placeholder="Optional notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-md active:scale-95"
        >
          Add Transaction
        </button>
      </form>
    </div>
  )
}
