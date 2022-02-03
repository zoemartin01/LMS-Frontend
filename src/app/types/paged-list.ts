export interface PagedList<T> {
    total: number;
    data: T[];
    page: number;
    pageSize: number;
}
