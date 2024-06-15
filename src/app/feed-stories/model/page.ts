export class Page {
  // The number of elements in the page
  size: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;

  constructor(size: number = 0, totalElements: number = 0, totalPages: number = 0, pageNumber: number = 0) {
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.pageNumber = pageNumber;
  }
}
