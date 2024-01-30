import { useNavigate } from "react-router-dom";
import { postUser } from "../api";
import Field from "../components/Field";

export default function UserNew() {
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await postUser({
            学生証番号: event.target.elements.studentId.value,
            学生氏名: event.target.elements.studentName.value,
          });
          navigate("/users/list");
        }}
      >
        <Field label="学生証番号">
          <input name="studentId" className="input" required />
        </Field>
        <Field label="学生氏名">
          <input name="studentName" className="input" required />
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
