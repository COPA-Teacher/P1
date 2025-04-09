// src/types/expense.ts
export enum ExpenseMode {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
}

export enum ExpenseType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
}

export interface Expense {
    id: string; // UUID or unique identifier
    mode: ExpenseMode;
    type: ExpenseType;
    amount: number; // Should be positive, validated in class
    date: string; // DDMMYYYY format
    description: string; // Max 30 words
    createdAt: Date; // When record was created
    updatedAt: Date; // Last update timestamp
}

// Validation class for Expense
export class ExpenseValidator {
    static validate(expense: Partial<Expense>): expense is Expense {
        if (
            !expense.mode ||
            !Object.values(ExpenseMode).includes(expense.mode)
        ) {
            throw new Error("Invalid expense mode");
        }

        if (
            !expense.type ||
            !Object.values(ExpenseType).includes(expense.type)
        ) {
            throw new Error("Invalid expense type");
        }

        if (typeof expense.amount !== "number" || expense.amount <= 0) {
            throw new Error("Amount must be a positive number");
        }

        if (!/^\d{8}$/.test(expense.date || "")) {
            throw new Error("Date must be in DDMMYYYY format");
        }

        if (
            !expense.description ||
            expense.description.split(" ").length > 30
        ) {
            throw new Error("Description must be 30 words or less");
        }

        return true;
    }
}
