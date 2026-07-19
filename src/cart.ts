export interface CartEntry {
  cartridges: number;
  kits: number;
  bottles: number;
}

export type Cart = Record<string, CartEntry>;

export type CartKind = keyof CartEntry;

export const emptyEntry: CartEntry = { cartridges: 0, kits: 0, bottles: 0 };

export function cartItemCount(cart: Cart): number {
  return Object.values(cart).reduce(
    (sum, e) => sum + e.cartridges + e.kits + e.bottles,
    0,
  );
}
