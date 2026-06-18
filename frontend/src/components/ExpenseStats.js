import React from 'react';
import '../styles/ExpenseStats.css';

function ExpenseStats({ stats }) {
  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  // Get color for category
  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Travel: '#4ECDC4',
      Entertainment: '#FFE66D',
      Shopping: '#95E1D3',
      Bills: '#A8E6CF',
      Healthcare: '#FF8B94',
      Other: '#C7CEEA',
    };
    return colors[category] || '#DDD';
  };

  // Calculate percentage for category
  const calculatePercentage = (amount) => {
    const total = parseFloat(stats.totalSpent);
    if (total === 0) return 0;
    return ((amount / total) * 100).toFixed(1);
  };

  return (
    <div className="stats-container">
      {/* ============================================
          SUMMARY CARDS
          ============================================ */}
      <section className="stats-summary">
        <h2>📊 Summary</h2>

        {/* Total Spent Card */}
        <div className="stat-card total-spent">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <label>Total Spent</label>
            <h3>₹{parseFloat(stats.totalSpent || 0).toFixed(2)}</h3>
          </div>
        </div>

        {/* Average Expense Card */}
        <div className="stat-card average-expense">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <label>Average Expense</label>
            <h3>₹{stats.averageExpense}</h3>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="stat-card total-count">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <label>Total Expenses</label>
            <h3>{stats.totalExpenses || 0}</h3>
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORY BREAKDOWN
          ============================================ */}
      <section className="category-breakdown">
        <h2>🎯 Breakdown by Category</h2>

        {Object.keys(stats.categoryBreakdown).length === 0 ? (
          <p className="no-data">No expenses recorded yet</p>
        ) : (
          <div className="category-list">
            {Object.entries(stats.categoryBreakdown).map(
              ([category, amount]) => (
                <div key={category} className="category-item">
                  {/* Category Bar */}
                  <div className="category-bar">
                    <div
                      className="category-bar-fill"
                      style={{
                        width: `${calculatePercentage(amount)}%`,
                        backgroundColor: getCategoryColor(category),
                      }}
                    ></div>
                  </div>

                  {/* Category Info */}
                  <div className="category-info">
                    <span className="category-name">{category}</span>
                    <span className="category-amount">
                      ₹{parseFloat(amount).toFixed(2)}
                    </span>
                  </div>

                  {/* Percentage */}
                  <span className="category-percentage">
                    {calculatePercentage(amount)}%
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* ============================================
          PIE CHART (using SVG)
          ============================================
          Why SVG for pie chart?
          - No external library needed
          - Lightweight and fast
          - Easy to customize colors
          - Works on all devices
          */}
      {Object.keys(stats.categoryBreakdown).length > 0 && (
        <section className="pie-chart-section">
          <h2>📌 Visual Breakdown</h2>
          <svg className="pie-chart" viewBox="0 0 200 200">
            {renderPieChart(stats)}
          </svg>
          <div className="pie-legend">
            {Object.keys(stats.categoryBreakdown).map((category) => (
              <div key={category} className="legend-item">
                <span
                  className="legend-color"
                  style={{
                    backgroundColor: getCategoryColor(category),
                  }}
                ></span>
                <span className="legend-label">{category}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ============================================
// RENDER PIE CHART
// ============================================
// This function draws a pie chart using SVG
// How it works:
// 1. Calculate total spending
// 2. For each category, calculate percentage
// 3. Draw a slice for each category
// 4. Use different colors for each slice

function renderPieChart(stats) {
  const total = parseFloat(stats.totalSpent);
  if (total === 0) return null;

  const colors = {
    Food: '#FF6B6B',
    Travel: '#4ECDC4',
    Entertainment: '#FFE66D',
    Shopping: '#95E1D3',
    Bills: '#A8E6CF',
    Healthcare: '#FF8B94',
    Other: '#C7CEEA',
  };

  const getCategoryColor = (category) => {
    return colors[category] || '#DDD';
  };

  let currentAngle = 0;
  const slices = [];

  Object.entries(stats.categoryBreakdown).forEach(([category, amount]) => {
    const slicePercentage = amount / total;
    const sliceAngle = slicePercentage * 360;

    // Convert angle to SVG path
    const startX = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
    const startY = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);

    const endX = 100 + 80 * Math.cos(((currentAngle + sliceAngle) * Math.PI) / 180);
    const endY = 100 + 80 * Math.sin(((currentAngle + sliceAngle) * Math.PI) / 180);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = `
      M 100 100
      L ${startX} ${startY}
      A 80 80 0 ${largeArc} 1 ${endX} ${endY}
      Z
    `;

    slices.push(
      <path
        key={category}
        d={pathData}
        fill={getCategoryColor(category)}
        stroke="white"
        strokeWidth="2"
      />
    );

    currentAngle += sliceAngle;
  });

  return slices;
}

export default ExpenseStats;
