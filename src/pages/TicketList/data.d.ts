export interface TableListItem {
  id?: string;
  owner?: string;
  name?: string;
  type?: string;
  staff?: string;
  schedule?: string;
  title?: string;
  description?: string;
  destination?: string;
  phone?: string;
  status?: string;
  reply?: string;
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
  ticketid?: string;
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
