import { books, book, createBook, updateBook, deleteBook } from './books'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('books', () => {
  scenario('returns all books', async (scenario) => {
    const result = await books()

    expect(result.length).toEqual(Object.keys(scenario.book).length)
  })

  scenario('returns a single book', async (scenario) => {
    const result = await book({ id: scenario.book.one.id })

    expect(result).toEqual(scenario.book.one)
  })

  scenario('creates a book', async () => {
    const result = await createBook({
      input: { title: 'String' },
    })

    expect(result.title).toEqual('String')
  })

  scenario('updates a book', async (scenario) => {
    const original = await book({ id: scenario.book.one.id })
    const result = await updateBook({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a book', async (scenario) => {
    const original = await deleteBook({ id: scenario.book.one.id })
    const result = await book({ id: original.id })

    expect(result).toEqual(null)
  })
})
