import React from 'react';
import '../styles/ExpenseList.css';

function ExpenseList({ expenses, loading, onEdit, onDelete }) {
  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get emoji for category
  const getCategoryEmoji = (category) => {
    const emojis = {
      Food: '🍔',
      Travel: '✈️',
      Entertainment: '🎬',
      Shopping: '🛍️',
      Bills: '📄',
      Healthcare: '🏥',
      Other: '📌',
    };
    return emojis[category] || '💰';
  };

  // ============================================
  // RENDER
  // ============================================

  if (loading) {
    return (
      <section className="expense-list-container">
        <h2>📋 Recent Expenses</h2>
        <div className="loading">Loading expenses...</div>
      </section>
    );
  }

  return (
    <section className="expense-list-container">
      <h2>📋 Recent Expenses ({expenses.length})</h2>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses yet. Add one to get started! 🎉</p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <div key={expense._id} className="expense-item">
              {/* Category Emoji */}
              <div className="expense-emoji">
                {getCategoryEmoji(expense.category)}
              </div>

              {/* Expense Details */}
              <div className="expense-details">
                <div className="expense-header">
                  <h3>{expense.description}</h3>
                  <span className="expense-category">{expense.category}</span>
                </div>
                <p className="expense-date">{formatDate(expense.date)}</p>
              </div>

              {/* Amount */}
              <div className="expense-amount">
                <span className="amount">₹{expense.amount.toFixed(2)}</span>
              </div>

              {/* Actions */}
              <div className="expense-actions">
                <button
                  onClick={() => onEdit(expense)}
                  className="btn-edit"
                  title="Edit expense"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(expense._id)}
                  className="btn-delete"
                  title="Delete expense"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
