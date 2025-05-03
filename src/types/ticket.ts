export type User = {
  id: string;
  name: string;
  total: number;
};

export interface Product {
  id: string;
  /** Descripción del producto */
  name: string;
  /** Precio unitario en euros */
  price: number;
  /** Cantidad comprada */
  quantity: number;
  /** Usuarios asociados al producto (vacío si no se asigna) */
  users: User[];
}

export interface Receipt {
  /** Nombre de la tienda o proveedor */
  nombre: string;
  /** Total del ticket en euros */
  total: number;
  /** Lista de productos en el ticket */
  products: Product[];
}
