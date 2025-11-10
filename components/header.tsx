"use client"

interface HeaderProps {
  activeTab: "overview" | "transactions" | "categories"
  setActiveTab: (tab: "overview" | "transactions" | "categories") => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-b border-primary/20 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">💰</span>
              </div>
              <h1 className="text-3xl font-bold">Finance Tracker</h1>
            </div>
            <p className="text-primary-foreground/70 text-sm mt-2">Track your income and expenses with ease</p>
          </div>
        </div>

        <nav className="flex gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-primary-foreground text-primary shadow-md scale-105"
                : "text-primary-foreground hover:bg-primary-foreground/20"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "transactions"
                ? "bg-primary-foreground text-primary shadow-md scale-105"
                : "text-primary-foreground hover:bg-primary-foreground/20"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "categories"
                ? "bg-primary-foreground text-primary shadow-md scale-105"
                : "text-primary-foreground hover:bg-primary-foreground/20"
            }`}
          >
            Categories
          </button>
        </nav>
      </div>
    </header>
  )
}
