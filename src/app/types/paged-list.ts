import { environment } from 'src/environments/environment';
import { PagedResponse } from './paged-response';

export class PagedList<T> {
  total: number = 0;
  data: T[] = [];
  page: number = 1;
  pageSize: number = environment.defaultPageSize;

  parse(
    res: PagedResponse<T>,
    page: number,
    map: ((value: T, index: number, array: T[]) => T) | undefined = undefined
  ): PagedList<T> {
    this.total = res.total;
    this.page = page;

    if (map) {
      this.data = res.data.map(map);
    } else {
      this.data = res.data;
    }

    return this;
  }
}
