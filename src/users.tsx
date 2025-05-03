import { Plus, Trash, User } from 'lucide-react';
import { useUsersStore } from './store/userStore';
import { useTicketStore } from './store/useTicketStore';
import { useUpdateStores } from './hooks/updateStores';

export const UserManage = () => {
  const { users, addUser, setUsers } = useUsersStore();
  const { ticket } = useTicketStore();
  const { updateStores } = useUpdateStores();

  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    if (!name) return;
    addUser({ id: crypto.randomUUID(), name: name.toLowerCase(), total: 0 });
    e.currentTarget.reset();
  };

  const handleDeleteUser = (id: string) => {
    const usersToSet = users.filter((user) => user.id !== id);
    setUsers(usersToSet);

    const newProducts = ticket?.products.map((product) => {
      return {
        ...product,
        users: product.users.filter((user) => user.id !== id),
      };
    });

    const ticketToSet = {
      ...ticket!,
      products: newProducts!,
    };

    updateStores(ticketToSet!, usersToSet);
  };

  return (
    <section className="flex-col gap-4 rounded-xl border border-neutral-300 p-4 h-fit">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <User />
        Personas que han participado en la compra
      </h2>
      <form id="creeate-user-form" className="flex gap-2 py-4" onSubmit={createUser}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del usuario"
          className="border-x-0 border-b border-t-0 rounded-none focus:outline-none focus:border-b-3 min-h-10 pl-6 col-span-4 w-full font-mono"
        />
        <button type="submit" className="btn ">
          Agregar <Plus />
        </button>
      </form>
      {users.length > 0 ? (
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-2 bg-neutral-100 py-2 px-4 rounded-xl">
              <div className="flex items-center gap-2">
                <img
                  className="h-12 w-12 rounded-full bg-white"
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                />
                <p className="capitalize">{user.name}</p>
                <span className="text-neutral-400">({user.total.toFixed(2)}€)</span>
              </div>
              <button
                type="button"
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDeleteUser(user.id)}
              >
                <Trash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-neutral-400 py-10">
          <User className="size-16 text-neutral-300" />
          <p>No hay usuarios añadidos</p>
          <p>Agrege un usuario para asignarle los gastos</p>
        </div>
      )}
    </section>
  );
};
