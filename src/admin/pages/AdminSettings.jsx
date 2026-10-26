import { useEffect, useState } from "react";
import api, { errorMessage } from "../../api/Client";
import { settingsFields } from "../adminSchemas";
import SchemaForm from "../components/SchemaForm";
import AdminIcon from "../components/Adminicon";
import { useToast } from "../components/Toast";

export default function AdminSettings() {
  const toast = useToast();
  const [settings, setSettings] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    api
      .get("/admin/settings")
      .then((res) => setSettings(res.data))
      .catch((err) => setLoadError(errorMessage(err)));
  }, []);

  async function save(payload) {
    const { data } = await api.put("/admin/settings", payload);
    setSettings(data);
    toast.success("Settings saved");
  }

  return (
    <div className="view">
      <header className="adminhead adminhead--row">
        <div className="adminhead__title">
          <span className="titlechip" style={{ "--c": "var(--w4)" }}><AdminIcon name="settings" size={22} /></span>
          <div>
            <h1>Site settings</h1>
            <p>Home page headline, calendar milestones, footer and contact details.</p>
          </div>
        </div>
      </header>
      {loadError && <p className="aerror" role="alert">{loadError}</p>}
      {!settings && !loadError && (
        <div className="panel"><div className="skeletons">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton skeleton--row" />)}</div></div>
      )}
      {settings && (
        <div className="panel panel--form">
          <SchemaForm fields={settingsFields} initial={settings} onSubmit={save} submitLabel="Save settings" />
        </div>
      )}
    </div>
  );
}