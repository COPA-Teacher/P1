import { Request, Response } from "express";
import { Expense, ExpenseValidator } from "../types/expense.js"; // Added import
import logger from "../services/logger.js";

export const addExpense = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            logger.warn("Unauthorized expense addition attempt");
            return res.status(401).json({ error: "Unauthorized" });
        }

        const newExpense: Expense = {
            id: generateId(),
            mode: req.body.mode,
            type: req.body.type,
            amount: parseFloat(req.body.amount),
            date: req.body.date,
            description: req.body.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        ExpenseValidator.validate(newExpense); // Now properly imported

        req.user.expenses.push(newExpense);

        logger.info("Expense added successfully", {
            userId: req.user.id,
            expenseId: newExpense.id,
        });

        res.status(201).json(newExpense);
    } catch (error: unknown) {
        // Proper error typing
        if (error instanceof Error) {
            logger.error("Failed to add expense", {
                error: error.message,
                userId: req.user?.id,
            });
            res.status(400).json({ error: error.message });
        } else {
            logger.error("Unknown error occurred", {
                error: String(error),
                userId: req.user?.id,
            });
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

function generateId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}
