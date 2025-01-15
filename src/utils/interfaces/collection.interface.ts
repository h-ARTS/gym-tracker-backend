export interface Collection {
  hasNext?: boolean;
  items: Array<Item>;
}

export interface Item {
  id?: string;
}
