import { useEffect, useRef } from "react";
import AdminIcon from "./Adminicon";

export default function ConfirmDialog({ open, title, message, confirmLabel = "Delete", busy = false, onConfirm, onCancel }) {
  const cancelButton = useRef(null);
  const cancelRef = useRef(onCancel);

  useEffect(() => {
    cancelRef.current = onCancel;
  });

  useEffect(() => {
    if (!open) return;
    cancelButton.current?.focus();
    const onKey = (e) => e.key === "Escape" && cancelRef.current();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal__card" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message">
        <span className="modal__icon"><AdminIcon name="alert" size={22} /></span>
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-message">{message}</p>
        <div className="modal__actions">
          <button ref={cancelButton} type="button" className="abtn abtn--ghost" onClick={onCancel}>Cancel</button>
          <button type="button" className="abtn abtn--solid-danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}