import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupModal from "../pages/Signupmodal";

// One signup popup for the whole public site.
// Any component can open it with:  const { openSignup } = useSignup();
const SignupContext = createContext({ openSignup: () => {} });

export const useSignup = () => useContext(SignupContext);

export function SignupProvider({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openSignup = useCallback(() => setOpen(true), []);
  const closeSignup = useCallback(() => setOpen(false), []);
  const handleSuccess = useCallback(() => {
    setOpen(false);
    navigate("/roadmap");
  }, [navigate]);

  const value = useMemo(() => ({ openSignup }), [openSignup]);

  return (
    <SignupContext.Provider value={value}>
      {children}
      <SignupModal open={open} onClose={closeSignup} onSuccess={handleSuccess} />
    </SignupContext.Provider>
  );
}