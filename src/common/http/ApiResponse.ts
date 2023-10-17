import { Pagination } from "../utils/Pagination";

export class ApiResponse {
  public status: number;
  public data: any;
  public error: string;
  public date: Date = new Date();
  public pagination: Pagination;
  constructor(
    status: number,
    data: any,
    error: string,
    date: Date = new Date(),
    pagination: Pagination,
  ) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.date = date;
    this.pagination = pagination;
  }
}
