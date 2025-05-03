import { Product, Receipt } from '../types/ticket';
import { User } from '../types/user';

interface Input {
  users: User[];
  receipt: Receipt;
}

export const calculateTotals = ({ users, receipt }: Input): User[] => {
  receipt.products.map((product) => {
    product.users.forEach((user) => {
      const userToSet = users.find((u) => u.id == user.id);
      if (userToSet) {
        userToSet.total += Number(product.price) / product.users.length;
      }
    });
  });

  return users;
};

export const calcUsersTotals = (products: Product[]): Record<string, number> =>
  products.reduce<Record<string, number>>((acc, p) => {
    if (!p.users.length) return acc;
    const share = (p.price * p.quantity) / p.users.length;

    p.users.forEach((u) => {
      acc[u.id] = (acc[u.id] ?? 0) + share;
    });
    return acc;
  }, {});

export const calcTotal = (products: Product[]): number => products.reduce((acc, p) => acc + p.price * p.quantity, 0);
