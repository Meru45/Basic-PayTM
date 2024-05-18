import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { Button } from "../components/Button.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
    localStorage.setItem("token", response.data.accessToken);
    navigate("/dashboard");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            value={firstName}
            onChange={useCallback(
              (e) => setFirstName(e.target.value),
              [firstName],
            )}
            label={"First Name"}
            placeholder={"John"}
            type="text"
          />
          <InputBox
            value={lastName}
            onChange={useCallback(
              (e) => setLastName(e.target.value),
              [lastName],
            )}
            label={"Last Name"}
            placeholder={"Doe"}
            type="text"
          />
          <InputBox
            value={email}
            onChange={useCallback((e) => setEmail(e.target.value), [email])}
            label={"Email"}
            placeholder={"jondoe@gmail.com"}
            type="email"
          />
          <InputBox
            value={password}
            onChange={useCallback(
              (e) => setPassword(e.target.value),
              [password],
            )}
            label={"Password"}
            placeholder={"12345678"}
            type="password"
          />
          <div className="pt-4">
            <Button onClick={handleClick}>Sign Up</Button>
          </div>
          <BottomWarning
            label={"Already have and account?"}
            bottomText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
