export interface TableListItem {
  uid?: string;
  name?: string;
  nickname?: string;
  gender?: string;
  type?: string;
  email?: string;
  Address?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams extends Partial<TableListItem> {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
