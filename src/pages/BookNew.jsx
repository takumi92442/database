import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuthors,
  getPublishers,
  postAuthor,
  postBook,
  postPublisher,
} from "../api";
import AuthorModal from "../components/AuthorModal";
import Field from "../components/Field";
import PublisherModal from "../components/PublisherModal";

export default function BookNew() {
  const navigate = useNavigate();
  const [publisherModalIsActive, setPublisherModalIsActive] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [authorModalIsActive, setAuthorModalIsActive] = useState(false);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      const publishers = await getPublishers();
      setPublishers(publishers);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const authors = await getAuthors();
      setAuthors(authors);
    })();
  }, []);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await postBook({
            ISBNコード: event.target.elements.title.value,
            書籍名: event.target.elements.title.value,
            著者: [...event.target.elements.authors.selectedOptions].map(
              (option) => +option.value
            ),
            出版社: +event.target.elements.publisher.value,
          });
          navigate("/books/list");
        }}
      >
        <Field label="ISBNコード">
          <input name="isbn" className="input" required />
        </Field>
        <Field label="書籍名">
          <input name="title" className="input" required />
        </Field>
        <Field
          label="出版社"
          help={
            <a
              onClick={(event) => {
                event.preventDefault();
                setPublisherModalIsActive(true);
              }}
            >
              新規登録
            </a>
          }
        >
          <div className="select is-fullwidth">
            <select name="publisher">
              {publishers.map((publisher) => {
                return (
                  <option
                    key={publisher.出版社番号}
                    value={publisher.出版社番号}
                  >
                    {publisher.出版社名}
                  </option>
                );
              })}
            </select>
          </div>
        </Field>
        <Field
          label="著者"
          help={
            <a
              onClick={(event) => {
                event.preventDefault();
                setAuthorModalIsActive(true);
              }}
            >
              新規登録
            </a>
          }
        >
          <div className="select is-fullwidth is-multiple">
            <select name="authors" multiple>
              {authors.map((author) => {
                return (
                  <option key={author.著者番号} value={author.著者番号}>
                    {author.著者名}
                  </option>
                );
              })}
            </select>
          </div>
        </Field>
        <Field>
          <button className="button is-primary" type="submit">
            登録
          </button>
        </Field>
      </form>
      <PublisherModal
        isActive={publisherModalIsActive}
        onDismiss={async (publisher) => {
          if (publisher) {
            await postPublisher(publisher);
            const publishers = await getPublishers();
            setPublishers(publishers);
          }
          setPublisherModalIsActive(false);
        }}
      />
      <AuthorModal
        isActive={authorModalIsActive}
        onDismiss={async (author) => {
          if (author) {
            await postAuthor(author);
            const authors = await getAuthors();
            setAuthors(authors);
          }
          setAuthorModalIsActive(false);
        }}
      />
    </>
  );
}
