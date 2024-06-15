import { Page } from "./page";

describe("Page", () => {
  it("should create an instance with default values", () => {
    const page = new Page();
    expect(page.size).toBe(0);
    expect(page.totalElements).toBe(0);
    expect(page.totalPages).toBe(0);
    expect(page.pageNumber).toBe(0);
  });

  it("should create an instance with given values", () => {
    const size = 10;
    const totalElements = 100;
    const totalPages = 10;
    const pageNumber = 1;

    const page = new Page(size, totalElements, totalPages, pageNumber);
    expect(page.size).toBe(size);
    expect(page.totalElements).toBe(totalElements);
    expect(page.totalPages).toBe(totalPages);
    expect(page.pageNumber).toBe(pageNumber);
  });

  it("should create an instance with partially given values", () => {
    const size = 5;
    const totalElements = 50;

    const page = new Page(size, totalElements);
    expect(page.size).toBe(size);
    expect(page.totalElements).toBe(totalElements);
    expect(page.totalPages).toBe(0); // default value
    expect(page.pageNumber).toBe(0); // default value
  });
});
