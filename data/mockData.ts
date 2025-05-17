import { User, Transaction, Category } from "@/types";

export const mockUser: User = {
  id: "user-001",
  name: "John Doe",
  email: "john.doe@example.com",
  password: "123456",
  profilePicture: "/images/avatar.png",
  createdAt: new Date("2025-01-15"),
  updatedAt: new Date("2025-04-20"),
};

export const mockCategories: Category[] = [
  { id: "cat-001", name: "Food", type: "expense" },
  { id: "cat-002", name: "Housing", type: "expense" },
  { id: "cat-003", name: "Transportation", type: "expense" },
  { id: "cat-004", name: "Entertainment", type: "expense" },
  { id: "cat-005", name: "Utilities", type: "expense" },
  { id: "cat-006", name: "Shoping", type: "expense" },
  { id: "cat-007", name: "Other", type: "income" },
];

export const mockTransactions: Transaction[] = [
  {
    id: "trans-001",
    userId: "user-001",
    amount: 300000,
    description: "Pengeluaran makan",
    category: "cat-001",
    date: new Date("2025-05-13T12:00:00"),
    type: "expense",
    createdAt: new Date("2025-05-13T12:00:00"),
    updatedAt: new Date("2025-05-13T12:00:00"),
  },
  {
    id: "trans-002",
    userId: "user-001",
    amount: 10000,
    description: "Parkir motor",
    category: "cat-002",
    date: new Date("2025-05-13T09:30:00"),
    type: "expense",
    createdAt: new Date("2025-05-13T09:30:00"),
    updatedAt: new Date("2025-05-13T09:30:00"),
  },
  {
    id: "trans-003",
    userId: "user-001",
    amount: 5000000,
    description: "Gaji bulanan",
    category: "cat-007",
    date: new Date("2025-05-01T08:00:00"),
    type: "income",
    createdAt: new Date("2025-05-01T08:00:00"),
    updatedAt: new Date("2025-05-01T08:00:00"),
  },
  {
    id: "trans-004",
    userId: "user-001",
    amount: 1000000,
    description: "Bonus proyek",
    category: "cat-008",
    date: new Date("2025-05-05T14:30:00"),
    type: "income",
    createdAt: new Date("2025-05-05T14:30:00"),
    updatedAt: new Date("2025-05-05T14:30:00"),
  },
  {
    id: "trans-005",
    userId: "user-001",
    amount: 450000,
    description: "Belanja bulanan",
    category: "cat-003",
    date: new Date("2025-05-10T16:45:00"),
    type: "expense",
    createdAt: new Date("2025-05-10T16:45:00"),
    updatedAt: new Date("2025-05-10T16:45:00"),
  },
  {
    id: "trans-006",
    userId: "user-001",
    amount: 200000,
    description: "Nonton bioskop",
    category: "cat-004",
    date: new Date("2025-05-11T19:00:00"),
    type: "expense",
    createdAt: new Date("2025-05-11T19:00:00"),
    updatedAt: new Date("2025-05-11T19:00:00"),
  },
  {
    id: "trans-007",
    userId: "user-001",
    amount: 150000,
    description: "Tagihan internet",
    category: "cat-005",
    date: new Date("2025-05-12T10:15:00"),
    type: "expense",
    createdAt: new Date("2025-05-12T10:15:00"),
    updatedAt: new Date("2025-05-12T10:15:00"),
  },
  {
    id: "trans-008",
    userId: "user-001",
    amount: 80000,
    description: "Beli buku",
    category: "cat-006",
    date: new Date("2025-05-12T13:20:00"),
    type: "expense",
    createdAt: new Date("2025-05-12T13:20:00"),
    updatedAt: new Date("2025-05-12T13:20:00"),
  },
];

export const getTransactionsByType = (
  type: "income" | "expense"
): Transaction[] => {
  return mockTransactions.filter((transaction) => transaction.type === type);
};

export const getTotalIncome = (): number => {
  return getTransactionsByType("income").reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
};

export const getTotalExpense = (): number => {
  return getTransactionsByType("expense").reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
};

export const getTotalBalance = (): number => {
  return getTotalIncome() - getTotalExpense();
};

export const getRecentTransactions = (limit: number = 5): Transaction[] => {
  return [...mockTransactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
};

export const getExpensesByCategory = (): {
  category: string;
  amount: number;
}[] => {
  const expenseCategories = mockCategories.filter(
    (cat) => cat.type === "expense"
  );

  return expenseCategories
    .map((category) => {
      const transactions = mockTransactions.filter(
        (trans) => trans.category === category.id && trans.type === "expense"
      );
      const amount = transactions.reduce(
        (sum, transactions) => sum + transactions.amount,
        0
      );

      return {
        category: category.name,
        amount,
      };
    })
    .filter((item) => item.amount > 0);
};
