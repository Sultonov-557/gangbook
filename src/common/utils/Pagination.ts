class Pagination {
  public items: [];
  public pageSize: number;
  public currentPage: number;
  public pageCount: number;
  public currentPageItems: never[];

  constructor(items: [], pageSize: number = 10, currentPage: number = 1) {
    this.items = items;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.pageCount = Math.ceil(this.items.length / this.pageSize);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPageItems = this.items.slice(startIndex, endIndex);
  }
}
