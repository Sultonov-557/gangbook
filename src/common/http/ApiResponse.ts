import { Pagination } from "../utils/Pagination";

export class ApiResponse {
  public status: number;
  public data: any;
  public error: string;
  public date: Date = new Date();
  public pagination: Pagination | any;
  constructor(
    status: number,
    data: any,
    pagination: Pagination,
    date: Date = new Date(),
    error: string,
  ) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.date = date;
    this.pagination = pagination.simplify;
  }
}
