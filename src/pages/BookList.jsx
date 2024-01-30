import { useEffect, useState } from "react";
import { getBooks } from "../api";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const books = await getBooks();
      setBooks(books);
    })();
  }, []);

  return (
    <>
      <table className="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <th>ISBNコード</th>
            <th>書籍名</th>
            <th>著者</th>
            <th>出版社</th>
            <th>出版年</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.ISBNコード}>
                <td>{book.ISBNコード}</td>
                <td>{book.書籍名}</td>
                <td>{book.著者.map((author) => author.著者名).join(", ")}</td>
                <td>{book.出版社.出版社名}</td>
                <td>{book.出版年}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
