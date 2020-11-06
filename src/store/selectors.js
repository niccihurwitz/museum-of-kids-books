export const getBooks = s => s.appReducer.books
export const getBook = (s, bookId) => {
  return s.appReducer.books.get(bookId)
}
