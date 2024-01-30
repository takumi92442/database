import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, getUsers, postLending } from "../api";
import Field from "../components/Field";

export default function LendingNew() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const books = await getBooks();
      setBooks(books);
    })();
  }, []);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await postLending({
            学生: +event.target.elements.user.value,
            書籍: [...event.target.elements.books.selectedOptions].map(
              (option) => option.value
            ),
            貸出日: event.target.elements.lendingDate.value,
            返却予定日: event.target.elements.returnDate.value,
          });
          navigate("/lendings/list");
        }}
      >
        <Field label="学生">
          <div className="select is-fullwidth ">
            <select name="user">
              {users.map((user) => {
                return (
                  <option key={user.学生証番号} value={user.学生証番号}>
                    {user.学生氏名}
                  </option>
                );
              })}
            </select>
          </div>
        </Field>
        <Field label="書籍">
          <div className="select is-fullwidth is-multiple">
            <select name="books">
              {books.map((book) => {
                return (
                  <option key={book.ISBNコード} value={book.ISBNコード}>
                    {book.書籍名}
                  </option>
                );
              })}
            </select>
          </div>
        </Field>
        <Field label="貸出日">
          <input name="lendingDate" className="input" type="date" required />
        </Field>
        <Field label="返却予定日">
          <input name="returnDate" className="input" type="date" required />
        </Field>
        <Field>
          <button className="button is-primary" type="submit">
            登録
          </button>
        </Field>
      </form>
    </>
  );
}
