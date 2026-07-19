export interface CartEntry {
  cartridges: number;
  kits: number;
}

export type Cart = Record<string, CartEntry>;
