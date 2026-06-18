const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
      amount: {
        type: Number,
        required: [true, 'Please provide an amount'],
        min: [0.01, 'Amount must be greater than 0'],
      },
      category: {
        type: String,
        enum: ['Food','Travel','Entertainment','Shopping','Bills','Healthcare','others'],
        required: [true, 'Please provide a category'],
      },
      description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
      },
      date: {
        type: Date,
        default: Date.now, // can automatically use the current date and time
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },{
        timestamps: true,
    }
);

expenseSchema.index({ user: 1, date: -1 });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;