import { createReducer } from '@reduxjs/toolkit'
import books from '../books'

const booksMap = new Map()

books.forEach((book, index) => {
  booksMap.set(book.permalink, book)
})

const sortedbooks = new Map([...booksMap.entries()].sort((a,b) => {
  return new Date(parseInt(a.date)).getTime() - 
      new Date(parseInt(b.date)).getTime()
}))
console.log(sortedbooks)

const initialState = {
  books: sortedbooks,
  currentBook: null
}

const appReducer = createReducer(initialState, {
  
})

export default { appReducer }
