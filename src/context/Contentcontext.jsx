import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/Client";
import { fallbackContent } from "../data/content";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [state, setState] = useState({ loading: true, content: null });

  useEffect(() => {
    let alive = true;
    api
      .get("/content")
      .then((res) => alive && setState({ loading: false, content: res.data }))
      .catch((err) => {
        // If the API is down the site still works with the built-in copy.
        console.warn("Could not load content from the API, using built-in content:", err.message);
        if (alive) setState({ loading: false, content: fallbackContent });
      });
    return () => {
      alive = false;
    };
  }, []);

  if (state.loading) {
    return (
      <div className="splash" role="status" aria-live="polite">
        <span className="splash__bars" aria-hidden="true"><i /><i /><i /><i /></span>
        Loading
      </div>
    );
  }

  return <ContentContext.Provider value={state.content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error("useContent must be used inside <ContentProvider>");
  return content;
}