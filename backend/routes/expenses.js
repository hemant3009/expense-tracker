const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense.js');
const  protect = require('../middleware/auth.js');

router.use(protect);

// Get all expenses
router.get('/', async (req, res) => {
   try {
    const filter = { user: req.user.id };

    // if category is provided , add it to filter
    if(req.query.category && req.query.category !== 'All'){
        filter.category = req.query.category;
    }

    console.log(filter);
    // date filtering
    if(req.query.startDate && req.query.endDate){
        filter.date = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
        };
    }

    // console.log(filter.date.startDate);
    // find matching expense and sort by date
    const expenses = await Expense.find(filter).sort({
        date: -1 // sort by date , newest first(descending order)
    })

    res.status(200).json({
        success: true,
        count: expenses.length,
        expenses,
    });

   } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Error fetching expenses',
        error: error.message,
    });
   }
});

// create new expense
router.post('/', async(req, res) =>{
    try {
        const{ amount, category, description, date } = req.body;

        if(!amount || !category || !description){
            return res.status(400).json({
                success: false,
                message: 'Please provide amount, category and description',
            });
        }

        const expense = await Expense.create({
            amount,
            category,
            description,
            date: date || new Date(),
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: 'Expense created successfully',
            expense,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating expense',
            error: error.message,
        });
    }
});

// update expense
router.put('/:id', async (req,res) => {
    try {
        let expense = await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({
                success: false,
                message: 'Expense not found',
            });
        }

        // security check
        if(expense.user.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this expense',
            });
        }

        // update expense with new data
        Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // return updated expense
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Expense update successfully',
            expense,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating expense',
            error: error.message,
        });
    }
});

// delete expense
router.delete('/:id', async(req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({
                success: false,
                message: 'Expense not found',
            });
        }

        // security check
        if(expense.user.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this expense',
            });
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Expense deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting expnese',
            error: error.message,
        });
    }
})

// Get statistics
router.get('/stats', async(req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user.id
        })

        if(expenses.length === 0){ // !expense.length
            return res.status(200).json({
                success: true,
                stats: {
                    totalSpend: 0,
                    categoryBreakdown: {},
                    averageExpense: 0,
                },
            });
        }

        // calculate total spent
        const totalSpent = expenses.reduce(
            (sum, exp) => sum + exp.amount,
            0
        )

        //calculate spending by category
        const categoryBreakdown = {};
        expenses.forEach((exp) => {
            categoryBreakdown[exp.category] = (categoryBreakdown[exp.category] || 0) + exp.amount;
        });

        //calculate average expense
        const averageExpense = totalSpent / expenses.length;

        res.status(200).json({
            success: true,
            stats: {
                totalSpent: totalSpent.toFixed(2),
                categoryBreakdown,
                averageExpense: averageExpense.toFixed(2),
                totalExpenses: expenses.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message,
        });
    }
});

module.exports = router;