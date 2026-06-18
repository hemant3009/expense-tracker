import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseStats from '../components/ExpenseStats';
import '../styles/Dashboard.css';

function DashboardPage({ token, user }) {
  // ============================================
  // STATE VARIABLES
  // ============================================

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    category: 'All',
    startDate: '',
    endDate: '',
  });

  const [stats, setStats] = useState({
    totalSpent: 0,
    categoryBreakdown: {},
    averageExpense: 0,
  });

  // ============================================
  // FETCH EXPENSES (on component load and when filters change)
  // ============================================
  // Why useEffect?
  // - We want to fetch data when component first loads
  // - We also want to refetch when filters change
  // - useEffect dependency array tells it when to run again

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  // ============================================
  // API CALL: Get all expenses
  // ============================================
  // We pass:
  // - token in Authorization header (proves we're authenticated)
  // - filters in query parameters (category, date range)

  const fetchExpenses = async () => {
    setLoading(true);
    setError('');

    try {
      // Build query string with filters
      const queryParams = new URLSearchParams();
      if (filters.category !== 'All') {
        queryParams.append('category', filters.category);
      }
      if (filters.startDate) {
        queryParams.append('startDate', filters.startDate);
      }
      if (filters.endDate) {
        queryParams.append('endDate', filters.endDate);
      }

      const response = await fetch(
        `${API_BASE_URL}/expenses?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            // ============================================
            // AUTHORIZATION HEADER
            // ============================================
            // Format: "Bearer <token>"
            // Backend middleware checks this header and verifies the token
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to fetch expenses');
        return;
      }

      setExpenses(data.expenses);
      fetchStats();
    } catch (err) {
      setError('Error fetching expenses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // API CALL: Get statistics
  // ============================================
  // We fetch stats separately to display charts

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // ============================================
  // HANDLE ADD/UPDATE EXPENSE
  // ============================================
  // What happens:
  // 1. User submits expense form
  // 2. If editing, UPDATE the expense
  // 3. If new, CREATE a new expense
  // 4. Refetch expenses to update list

  const handleSaveExpense = async (expenseData) => {
    try {
      const method = editingExpense ? 'PUT' : 'POST';
      const url = editingExpense
        ? `${API_BASE_URL}/expenses/${editingExpense._id}`
        : `${API_BASE_URL}/expenses`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Error saving expense');
        return;
      }

      // Reset form and refetch
      setEditingExpense(null);
      fetchExpenses();
      alert(editingExpense ? 'Expense updated!' : 'Expense added!');
    } catch (err) {
      alert('Error saving expense: ' + err.message);
    }
  };

  // ============================================
  // HANDLE DELETE EXPENSE
  // ============================================

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/expenses/${expenseId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert('Error deleting expense');
        return;
      }

      fetchExpenses();
      alert('Expense deleted!');
    } catch (err) {
      alert('Error deleting expense: ' + err.message);
    }
  };

  // ============================================
  // HANDLE EDIT EXPENSE
  // ============================================
  // When user clicks edit, we set the expense in state
  // This pre-fills the form with existing data

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    window.scrollTo(0, 0); // Scroll to form
  };

  // ============================================
  // HANDLE CANCEL EDIT
  // ============================================

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* ============================================
            ERROR MESSAGE
            ============================================ */}
        {error && <div className="error-message">{error}</div>}

        {/* ============================================
            WELCOME SECTION
            ============================================ */}
        <section className="welcome-section">
          <h1>Welcome, {user?.name}! 👋</h1>
          <p>Track your expenses and manage your budget</p>
        </section>

        <div className="dashboard-layout">
          {/* ============================================
              LEFT COLUMN: Form + List
              ============================================ */}
          <div className="left-column">
            {/* Add/Edit Expense Form */}
            <ExpenseForm
              onSubmit={handleSaveExpense}
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />

            {/* Filters */}
            <section className="filters-section">
              <h2>Filter Expenses</h2>

              <div className="filter-group">
                <label>Category</label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option>All</option>
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Entertainment</option>
                  <option>Shopping</option>
                  <option>Bills</option>
                  <option>Healthcare</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                />
              </div>

              <div className="filter-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                />
              </div>

              <button
                onClick={() =>
                  setFilters({ category: 'All', startDate: '', endDate: '' })
                }
                className="reset-filters-btn"
              >
                Reset Filters
              </button>
            </section>

            {/* Expense List */}
            <ExpenseList
              expenses={expenses}
              loading={loading}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>

          {/* ============================================
              RIGHT COLUMN: Statistics and Charts
              ============================================ */}
          <div className="right-column">
            <ExpenseStats stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
