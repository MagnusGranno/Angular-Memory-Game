export interface Pokemon {
  name: string;
  url: string;
  type: string;
  state?: 'default' | 'flipped' | 'matched';
}
