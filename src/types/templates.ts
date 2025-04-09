// File: src/types/templates.ts

// Base template data (shared across all pages)
export interface BaseTemplateData {
    pageTitle: string;
    isAuthenticated: boolean;
    currentPage: string;
}

export interface PageRouteTemplateData extends BaseTemplateData {
    // Add unauthenticated-specific props here if needed
}

// Specific page data (extend as needed)
export interface HomeTemplateData extends BaseTemplateData {
    // Add home-specific props here if needed
}

export interface DashboardTemplateData extends BaseTemplateData {
    user: {
        name: string;
        email: string;
    };
    // Dashboard-specific props
}

export interface Transaction {
    id: number;
    date: string; // Or use Date if you're converting to Date objects
    type: "CREDIT" | "DEBIT";
    mode: "ONLINE" | "OFFLINE";
    amount: number;
    description: string;
}

export interface ExpenseSummary {
    totalTransactions: number;
    totalCredit: number;
    totalDebit: number;
    onlineCount: number;
    offlineCount: number;
}

export interface ExpenseData {
    summary: ExpenseSummary;
    transactions: Transaction[];
}

export interface DashboardTemplateData extends BaseTemplateData {
    user: {
        name: string;
        email: string;
    };
    expenseData: ExpenseData;
}
