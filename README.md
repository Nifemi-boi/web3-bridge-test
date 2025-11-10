# Personal Finance Tracker

A responsive, browser-based web application for tracking, categorizing, and analyzing your income and expenses with persistent data storage.

## Features

### Core Features
- **Transaction Management**: Add, view, filter, and delete income and expense transactions
- **Custom Categories**: Create color-coded categories for better organization
- **Data Persistence**: All data is automatically saved to browser localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Charts & Visualizations**: 
  - Monthly trend chart showing income vs expenses over time
  - Category-wise expense breakdown pie chart

### Additional Features
- **Advanced Filtering**: Filter transactions by type, category, and date
- **Sorting Options**: Sort by date or amount in ascending/descending order
- **CSV Export**: Export filtered transactions as CSV for external analysis
- **Summary Dashboard**: Quick view of total income, expenses, and balance

## Getting Started

### Installation

1. Clone or download the project
2. Install dependencies using the shadcn CLI or your package manager
3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### First Time Usage

The app comes with demo data pre-loaded so you can see how it works:
- 2 income transactions (Salary and Freelance)
- 3 expense transactions (Rent, Groceries, Utilities)
- 6 default categories (3 income, 3 expense)

You can start adding your own data immediately. All data persists in your browser's localStorage.

## How to Use

### Adding Transactions

1. Click on the **Overview** tab
2. Fill out the transaction form on the left:
   - Select transaction type (Income or Expense)
   - Enter the amount
   - Choose a category
   - Set the date
   - Add optional notes
3. Click "Add Transaction"

### Managing Categories

1. Use the category manager on the right side of Overview, or click **Categories** tab
2. To add a new category:
   - Enter a category name
   - Choose the type (Income or Expense)
   - Pick a color for visual identification
   - Click "Add Category"
3. To delete a category, click the "Delete" button next to any category

### Viewing Transactions

1. Click on the **Transactions** tab
2. Use the filter options to narrow down your data:
   - Filter by transaction type (All, Income, Expense)
   - Filter by category
   - Sort by newest/oldest or highest/lowest amount
3. Click **Export CSV** to download your filtered transactions

### Analyzing Data

The **Overview** tab shows:
- **Summary Cards**: Total income, total expenses, and current balance
- **Monthly Trend Chart**: Shows your income and expense patterns over time
- **Expense Breakdown**: Pie chart showing where your money goes by category

## Technical Details

### Technology Stack
- **Frontend**: React 19+ with TypeScript
- **Styling**: TailwindCSS v4
- **Charts**: Recharts library
- **Storage**: Browser localStorage (no backend required)

### Data Structure

#### Transaction
\`\`\`typescript
{
  id: string              // Unique identifier
  type: "income" | "expense"
  amount: number         // Transaction amount
  category: string       // Category name
  date: string          // YYYY-MM-DD format
  notes: string         // Optional notes
}
\`\`\`

#### Category
\`\`\`typescript
{
  id: string              // Unique identifier
  name: string           // Category name
  type: "income" | "expense"
  color: string         // Hex color code
}
\`\`\`

### Data Persistence

- Transactions and categories are stored in browser localStorage
- Data persists between browser sessions
- To clear all data, use your browser's developer tools to clear localStorage for this site
- No data is sent to any server

## Features Walkthrough

### Dashboard Overview
The overview dashboard provides a quick summary of your financial status with:
- Total income across all transactions
- Total expenses for the period
- Current balance (income - expenses)
- Visual representation of trends and spending patterns

### Transaction Management
- Add transactions with amount, date, category, and notes
- View all transactions in a sortable, filterable table
- Delete transactions you no longer need
- Export data to CSV for spreadsheet analysis

### Category Organization
- Create unlimited custom categories
- Color-code categories for quick visual identification
- Separate income and expense categories
- Delete categories you no longer use

### Filtering & Sorting
- Filter by transaction type (all/income/expense)
- Filter by specific category
- Sort by date (newest first or oldest first)
- Sort by amount (highest or lowest)
- Combine multiple filters for precise data views

## Deployment

To deploy this app to production:

1. **Vercel** (Recommended):
   - Click the deploy button in the v0 preview
   - Follow the prompts to connect your GitHub account
   - Your app will be live in seconds

2. **Other Platforms**:
   - Build: `npm run build`
   - Start: `npm start`
   - Deploy the `.next` folder to your hosting provider

## Browser Support

This app works in all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid and Flexbox

## Notes

- All data is stored locally in your browser; no cloud backup is performed
- Clearing browser data will remove all stored transactions and categories
- The app works offline - all operations are performed locally
- For data backup, regularly export your transactions as CSV

## Future Enhancements

Potential features for future versions:
- Date range filtering
- Budget creation and tracking
- Recurring transaction templates
- Data import from CSV
- Dark mode toggle
- Multiple account support
- Cloud synchronization
- Mobile app version

## License

This project is open source and available for personal use.

## Support

For issues or questions, please check:
1. Browser console for error messages (F12 → Console tab)
2. Verify localStorage is enabled in your browser
3. Try clearing browser cache and reloading the page

Enjoy tracking your finances!
