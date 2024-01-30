export default function field({ label, help, children }) {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">{children}</div>
      {help && <p className="help">{help}</p>}
    </div>
  );
}
