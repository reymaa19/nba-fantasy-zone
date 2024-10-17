import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/example/signup-form-demo";

const App = () => {
  //useEffect(() => {
  //  // Always apply the dark class to the document's root element
  //  // Implement theme toggle later
  //  document.documentElement.classList.add("dark");
  //}, []);

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default App;
