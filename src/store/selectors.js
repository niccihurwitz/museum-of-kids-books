export const getBooks = s => s.appReducer.books
export const getBook = (s, bookId) => {
  return s.appReducer.books.get(bookId)
}
export const getNavBooks = (s, bookId) => {
  const books = s.appReducer.books
  const curBook = s.appReducer.books.get(bookId)
  // console.log(s.appReducer.books)
  // const keys = s.appReducer.books.keys()
  // console.log(keys.next().value)
  console.log(curBook.index)
  const next = curBook.index < books.size - 1 ? curBook.index + 1 : 0
  const prev = curBook.index > 0 ? curBook.index - 1 : books.size - 1
  const navBooks = {
    prev: null,
    next: null
  }

  Array.from(books).map((pro, key, el) => {
    const book = pro[1]
    // console.log(el[key+1])

    if (key === prev) {
      navBooks.prev = el[key]
    }
    if (key === next) {
      navBooks.next = el[key]
    }
  })
  return navBooks
  // let newArray  = s.appReducer.books.map(function(value, index, elements) {
  //   let next = elements[index+1]
  //   // do something
  //   console.log(next)
  // });
}
