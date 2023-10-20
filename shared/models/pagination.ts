export interface WithPagination<T> {
  results: T[]
  currentPage: number
  pageSize: number
}
