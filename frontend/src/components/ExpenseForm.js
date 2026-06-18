import React, { useState, useEffect } from 'react';
import '../styles/ExpenseForm.css';

function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  // ============================================
  // STATE VARIABLES
  // ============================================

  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0], // Today's date
  });

  const [errors, setErrors] = useState({});

  // ============================================
  // WHEN EDITING, PRE-FILL FORM
  // ============================================
  // If editingExpense is passed, populate form with that data

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        description: editingExpense.description,
        date: editingExpense.date.split('T')[0], // Format date
      });
    } else {
      // Reset form for new expense
      setFormData({
        amount: '',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [editingExpense]);

  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // ============================================
  // VALIDATE FORM
  // ============================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    return newErrors;
  };

  // ============================================
  // HANDLE SUBMIT
  // ============================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call parent handler with form data
    onSubmit({
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    });

    // Reset form if not editing
    if (!editingExpense) {
      setFormData({
        amount: '',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <div className="expense-form-container">
      <h2>{editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}</h2>

      <form onSubmit={handleSubmit} className="expense-form">
        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Healthcare</option>
            <option>Other</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What did you spend on?"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        {/* Submit Buttons */}
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>

          {editingExpense && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
