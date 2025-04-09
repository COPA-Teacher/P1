import { Expense, ExpenseValidator } from "./expense.js"; // Added import

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    expenses: Expense[];
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
}

export class UserValidator {
    static validate(user: Partial<User>): user is User {
        if (!user.name || user.name.trim().length < 2) {
            throw new Error("Name must be at least 2 characters");
        }

        if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            throw new Error("Invalid email format");
        }

        if (!user.password || user.password.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }

        if (user.expenses) {
            user.expenses.forEach((expense) => {
                ExpenseValidator.validate(expense); // Now properly imported
            });
        }

        return true;
    }
}
