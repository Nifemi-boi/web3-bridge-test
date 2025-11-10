"use client"

import type React from "react"

import { useState } from "react"
import type { Category } from "@/app/page"

interface CategoryManagerProps {
  categories: Category[]
  onAddCategory: (category: Omit<Category, "id">) => void
  onDeleteCategory: (id: string) => void
}

const defaultColors = [
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#10b981",
  "#06b6d4",
  "#ec4899",
  "#64748b",
  "#a16207",
]

export function CategoryManager({ categories, onAddCategory, onDeleteCategory }: CategoryManagerProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [color, setColor] = useState(defaultColors[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Please enter a category name")
      return
    }

    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      alert("This category already exists")
      return
    }

    onAddCategory({ name: name.trim(), type, color })
    setName("")
    setType("expense")
    setColor(defaultColors[0])
  }

  const incomeCategories = categories.filter((c) => c.type === "income")
  const expenseCategories = categories.filter((c) => c.type === "expense")

  return (
    <div className="space-y-6">
      {/* Add Category Form */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Add Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              placeholder="e.g., Shopping"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Color</label>
            <div className="grid grid-cols-5 gap-2">
              {defaultColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    color === c ? "border-foreground scale-110 shadow-md" : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-md active:scale-95"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {incomeCategories.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Income Categories ({incomeCategories.length})</h3>
            <div className="space-y-2">
              {incomeCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: cat.color }} />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <button
                    onClick={() => onDeleteCategory(cat.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors text-sm font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {expenseCategories.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Expense Categories ({expenseCategories.length})</h3>
            <div className="space-y-2">
              {expenseCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: cat.color }} />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <button
                    onClick={() => onDeleteCategory(cat.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors text-sm font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {incomeCategories.length === 0 && expenseCategories.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No categories yet. Create your first category to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
