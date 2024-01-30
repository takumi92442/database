import Field from "../components/Field";

export default function PublisherModal({ isActive, onDismiss }) {
  return (
    <div className={`modal${isActive ? " is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onDismiss &&
              onDismiss({
                出版社名: event.target.elements.name.value,
              });
          }}
        >
          <header className="modal-card-head">
            <p className="modal-card-title">出版社登録</p>
          </header>
          <section className="modal-card-body">
            <Field label="出版社名">
              <input name="name" className="input" />
            </Field>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" type="submit">
              登録
            </button>
            <button
              className="button"
              onClick={(event) => {
                event.preventDefault();
                onDismiss && onDismiss(null);
              }}
            >
              キャンセル
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
