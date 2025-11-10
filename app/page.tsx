"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { CategoryManager } from "@/components/category-manager"

export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  date: string
  notes: string
}

export interface Category {
  id: string
  name: string
  type: "income" | "expense"
  color: string
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "categories">("overview")

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions")
    const savedCategories = localStorage.getItem("categories")

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      // Initialize with demo data
      const demoTransactions: Transaction[] = [
        { id: "1", type: "income", amount: 5000, category: "Salary", date: "2025-11-01", notes: "Monthly salary" },
        { id: "2", type: "expense", amount: 1200, category: "Rent", date: "2025-11-01", notes: "" },
        { id: "3", type: "expense", amount: 250, category: "Groceries", date: "2025-11-05", notes: "Weekly shopping" },
        { id: "4", type: "expense", amount: 80, category: "Utilities", date: "2025-11-03", notes: "Electricity bill" },
        { id: "5", type: "income", amount: 500, category: "Freelance", date: "2025-11-08", notes: "Project income" },
      ]
      setTransactions(demoTransactions)
      localStorage.setItem("transactions", JSON.stringify(demoTransactions))
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      // Initialize default categories
      const defaultCategories: Category[] = [
        { id: "1", name: "Salary", type: "income", color: "#3b82f6" },
        { id: "2", name: "Freelance", type: "income", color: "#8b5cf6" },
        { id: "3", name: "Rent", type: "expense", color: "#ef4444" },
        { id: "4", name: "Groceries", type: "expense", color: "#f97316" },
        { id: "5", name: "Utilities", type: "expense", color: "#eab308" },
        { id: "6", name: "Entertainment", type: "expense", color: "#ec4899" },
      ]
      setCategories(defaultCategories)
      localStorage.setItem("categories", JSON.stringify(defaultCategories))
    }
  }, [])

  // Save transactions to localStorage
  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    const updated = [newTransaction, ...transactions]
    setTransactions(updated)
    localStorage.setItem("transactions", JSON.stringify(updated))
  }

  const handleDeleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id)
    setTransactions(updated)
    localStorage.setItem("transactions", JSON.stringify(updated))
  }

  const handleAddCategory = (category: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    }
    const updated = [...categories, newCategory]
    setCategories(updated)
    localStorage.setItem("categories", JSON.stringify(updated))
  }

  const handleDeleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)
    localStorage.setItem("categories", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <>
            <Dashboard transactions={transactions} categories={categories} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <TransactionForm onAddTransaction={handleAddTransaction} categories={categories} />
              </div>
              <div>
                <CategoryManager
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              </div>
            </div>
          </>
        )}
        {activeTab === "transactions" && (
          <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
        )}
        {activeTab === "categories" && (
          <CategoryManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </main>
    </div>
  )
}
