import { useState } from "react";
import api, { errorMessage } from "../../api/Client";
import AdminIcon from "./Adminicon";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ImageField({ field, values, onChange }) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const url = values[field.name];

  async function upload(file) {
    if (!TYPES.includes(file.type)) return setError("Use a JPG, PNG, WebP or GIF image");
    if (file.size > MAX_BYTES) return setError("Image must be 5 MB or smaller");

    setBusy(true);
    setProgress(0);
    setError("");
    try {
      const form = new FormData();
      form.append("folder", field.folder || "images");
      form.append("image", file);
      const { data } = await api.post("/admin/uploads", form, {
        onUploadProgress: (e) => setProgress(Math.round((e.loaded / (e.total || file.size)) * 100)),
      });
      onChange(field.name, data.url);
      onChange(field.keyName, data.key);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function pick(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) upload(file);
  }

  function drop(e) {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }

  function clear() {
    onChange(field.name, "");
    onChange(field.keyName, "");
  }

  return (
    <div className="field field--wide">
      <span className="field__label">{field.label}</span>

      {url ? (
        <div className="imgcard">
          <img src={url} alt="Selected project" />
          <div className="imgcard__bar">
            <label className="abtn abtn--glass">
              <AdminIcon name="upload" size={16} /> {busy ? "Uploading…" : "Replace"}
              <input className="sr" type="file" accept={TYPES.join(",")} onChange={pick} disabled={busy} />
            </label>
            <button type="button" className="abtn abtn--glass" onClick={clear} disabled={busy}>
              <AdminIcon name="trash" size={16} /> Remove
            </button>
          </div>
          {busy && <div className="progress"><span style={{ width: `${progress}%` }} /></div>}
        </div>
      ) : (
        <label
          className={"dropzone" + (drag ? " is-drag" : "") + (busy ? " is-busy" : "")}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={drop}
        >
          <span className="dropzone__icon"><AdminIcon name="upload" size={24} /></span>
          <strong>{busy ? `Uploading… ${progress}%` : "Drop an image here, or click to browse"}</strong>
          <span>JPG, PNG, WebP or GIF, up to 5 MB</span>
          <input className="sr" type="file" accept={TYPES.join(",")} onChange={pick} disabled={busy} />
          {busy && <div className="progress"><span style={{ width: `${progress}%` }} /></div>}
        </label>
      )}

      {field.help && <small className="field__help">{field.help}</small>}
      {error && <small className="field__error" role="alert">{error}</small>}
    </div>
  );
}