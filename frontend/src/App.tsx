import "./App.css";
import { SignUp } from "@imforked/legos";

function App() {
  return (
    <SignUp
      action="http://localhost:4000" recaptchaSiteKey="6LclFO4rAAAAAFsnQqD1HrwAqO1rHhdl08Z-Ficd" />
  );
}

export default App;
