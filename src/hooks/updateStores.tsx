import { Receipt } from '../types/ticket';
import { useTicketStore } from '../store/useTicketStore';
import { useUsersStore } from '../store/userStore';
import { calcUsersTotals } from '../lib/utils';
import { User } from '../types/user';
interface UpdateStores {
  (ticket: Receipt, newUsers?: User[]): void;
}
export const useUpdateStores = () => {
  const { setTicket } = useTicketStore();
  const { users, setUsers } = useUsersStore();

  const updateStores: UpdateStores = (ticket, newUsers) => {
    const ticketToSet = { ...ticket };
    const usersCloned = newUsers ? newUsers : users;

    const total = ticketToSet!.products!.reduce((acc, p) => acc + p.price * p.quantity, 0);

    ticketToSet.total = total;

    setTicket(ticketToSet);

    const userToSet = calcUsersTotals(ticket!.products);
    const usersToSet = usersCloned.map((user) => {
      return {
        ...user,
        total: userToSet[user.id] ?? 0,
      };
    });

    setUsers(usersToSet);
  };

  return { updateStores };
};
