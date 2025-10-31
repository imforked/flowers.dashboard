import { useEffect } from "react";
import "./App.css";
import { SignUp } from "@imforked/legos";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  // TODO: remove this after you harvest ideas
  // const currentPathname = window.location.pathname;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${BACKEND_URL}${currentPathname}`);
  //       const data = await res.json();
  //       console.log("Frontend received:", data);
  //     } catch (err) {
  //       console.error("Failed to fetch from backend:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <SignUp
      action={`${BACKEND_URL}/signup`}
      recaptchaSiteKey="6LenrPwrAAAAAEOYEyIjgn_zRCa-F56BwmuUdS1m"
    />
  );
}

export default App;
