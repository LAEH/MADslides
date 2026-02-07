export interface ComparisonRow {
  metric: string;
  btree: string;
  betree: string;
  lsmtree: string;
}

export enum TreeType {
  BTree = 'B-tree',
  BeTree = 'Be-tree',
  LSMTree = 'LSM-tree'
}