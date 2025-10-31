import "./App.css";
import { SignUp } from "@imforked/legos";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <SignUp
      action={`${BACKEND_URL}/signup`}
      recaptchaSiteKey="6LenrPwrAAAAAEOYEyIjgn_zRCa-F56BwmuUdS1m"
    />
  );
}

export default App;
