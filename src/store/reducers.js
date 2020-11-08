import { createReducer } from '@reduxjs/toolkit'
import books from '../books'
import { setCurrentIndex } from './actions'

const booksMap = new Map()

books.forEach((book, index) => {
  booksMap.set(book.permalink, {...book, index})
})

const sortedbooks = new Map([...booksMap.entries()].sort((a,b) => {
  return new Date(parseInt(a.date)).getTime() - 
      new Date(parseInt(b.date)).getTime()
}))
console.log(sortedbooks)

const initialState = {
  books: booksMap,
  currentBook: null,
  currentIndex : 0
}

const appReducer = createReducer(initialState, {
  [setCurrentIndex.type]: (state, action) => {
    state.currentIndex = action.payload.currentIndex
  },
})

export default { appReducer }
