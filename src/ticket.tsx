import { Euro, Loader, Package, Plus, ReceiptText, X } from 'lucide-react';
import { useTicketStore } from './store/useTicketStore';
import { useUsersStore } from './store/userStore';
import { Dropdown, DropdownItem } from './components/ui/dropdown';
import { useEffect } from 'react';
import { useUpdateStores } from './hooks/updateStores';

export const Ticket = () => {
  const { ticket, setTicket, loading } = useTicketStore();
  const { users } = useUsersStore();
  const { updateStores } = useUpdateStores();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const { name, value } = e.target;

    const newProducts = ticket?.products.map((product) =>
      product.id == productId ? { ...product, [name]: value } : product
    );

    const ticketToSet = {
      ...ticket!,
      products: newProducts!,
    };

    updateStores(ticketToSet!);
  };

  const handleChangeUsers = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const newProducts = ticket?.products.map((product) => {
      if (product.id == productId) {
        const user = users.find((user) => user.id == e.target.name);
        if (user) {
          if (e.target.checked) {
            return { ...product, users: [...product.users, user] };
          } else {
            return { ...product, users: product.users.filter((u) => u.id != e.target.name) };
          }
        }
      }
      return product;
    });

    const ticketToSet = {
      ...ticket!,
      products: newProducts!,
    };

    updateStores(ticketToSet!);
  };

  const handleAddProduct = (): void => {
    const newProduct = {
      id: crypto.randomUUID(),
      name: '',
      quantity: 0,
      price: 0,
      users: [],
    };
    const ticketToSet = {
      ...ticket!,
      products: [newProduct, ...ticket!.products],
    };
    updateStores(ticketToSet!);
  };

  const handleRemoveProduct = (productId: string) => {
    const newProducts = ticket?.products.filter((product) => product.id !== productId);
    const ticketToSet = {
      ...ticket!,
      products: newProducts!,
    };
    updateStores(ticketToSet!);
  };

  useEffect(() => {
    if (!ticket) return;
    updateStores(ticket!);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-32">
          <p className="text-gray-500">Cargando ticket...</p>
          <Loader className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <section className="border border-neutral-300 rounded-xl p-4 mt-4 flex flex-col gap-4 flex-1">
          <article className="md:min-w-xl">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <ReceiptText />
              Ticket
            </h2>
            <div className="flex sm:items-center sm:justify-between gap-2 font-mono">
              <input
                autoComplete="off"
                type="text"
                name="nombre"
                value={ticket?.nombre ?? ''}
                className="border-x-0 border-b border-t-0 rounded-none focus:outline-none focus:border-b-3 min-h-10 sm:w-1/2 w-fit"
                onChange={(e) => setTicket({ ...ticket!, nombre: e.target.value })}
              />
              <div className="px-1 w-fit border-x-0 border-b border-t-0 rounded-none focus:outline-none focus:border-b-3 min-h-10">
                Total: {ticket?.total.toFixed(2) ?? '0.00'}€
              </div>
            </div>
            <div className="flex items-center gap-4 mt-10 justify-between sm:justify-start">
              <h3 className="text-md font-semibold flex items-center gap-2 text-xl">
                <Package /> Productos
              </h3>
              <div className="flex items-center gap-2">
                <button className="btn flex items-center" onClick={handleAddProduct}>
                  <Plus />
                  <span className="text-sm hidden sm:block">Añadir producto</span>
                </button>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              {ticket &&
                ticket.products.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-24 gap-2 md:place-content-center font-mono"
                  >
                    <input
                      type="text"
                      name={`name`}
                      value={product.name}
                      autoComplete="off"
                      className="col-span-3 sm:col-span-6 md:col-span-7 w-full border-x-0 border-b border-t-0 rounded-none focus:outline-none focus:border-b-3 min-h-10"
                      onChange={(e) => handleChange(e, product.id)}
                    />
                    <div className="md:col-span-3 relative">
                      <Package className="absolute size-4 text-neutral-500 bottom-0 top-0 my-auto" />
                      <input
                        autoComplete="off"
                        type="number"
                        name={`quantity`}
                        value={product.quantity}
                        className="border-x-0 border-b border-t-0 rounded-none focus:outline-none focus:border-b-3 min-h-10 lg:max-w-24 max-w-19 pl-6"
                        onChange={(e) => handleChange(e, product.id)}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-3 relative">
                      <Euro className="absolute size-4 text-neutral-500 bottom-0 top-0 my-auto" />
                      <input
                        autoComplete="off"
                        type="number"
                        className="border-x-0 border-b border-t-0 rounded-none focus:outline-none focus:border-b-3 min-h-10 w-full lg:max-w-24 sm:max-w-19 pl-6"
                        name={`price`}
                        value={product.price}
                        step={0.01}
                        onChange={(e) => handleChange(e, product.id)}
                      />
                    </div>
                    <Dropdown
                      placeHolder="Selecciona usuarios..."
                      classNames={{
                        dropdown:
                          'md:col-span-9 border border-0 border-b rounded-none sm:col-span-3 col-span-2 min-h-10',
                        button: 'w-full h-full flex items-center justify-between rounded-sm px-2 uppercase truncate',
                        container: 'bg-white shadow-lg rounded-sm border border-neutral-300 mt-1',
                      }}
                      defaultValue={product.users.map((user) => ({
                        value: user.id,
                        label: user.name,
                      }))}
                    >
                      <DropdownItem className="bg-white w-full sm:min-w-52 min-w-36">
                        {users.length > 0 ? (
                          users.map((user) => (
                            <label
                              htmlFor={user.id}
                              key={user.id}
                              className="text-base flex justify-between mt-1 active:bg-neutral-100 cursor-pointer capitalize"
                            >
                              {user.name}
                              <input
                                autoComplete="off"
                                type="checkbox"
                                className="checkbox"
                                defaultChecked={product.users.some((u) => u.id == user.id)}
                                name={user.id}
                                onChange={(e) => handleChangeUsers(e, product.id)}
                              />
                            </label>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 p-2">No hay usuarios añadidos</p>
                        )}
                      </DropdownItem>
                    </Dropdown>
                    <button
                      type="button"
                      className="text-white bg-red-500 p-2 grid place-content-center rounded-md cursor-pointer hover:bg-red-600 transition-colors duration-200 md:col-span-2"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
            </div>
          </article>
        </section>
      )}
    </>
  );
};
