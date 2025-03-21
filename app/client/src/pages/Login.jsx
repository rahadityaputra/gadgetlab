import React, { useCallback, useState, useContext } from "react";
import LoginForm from "../components/LoginForm.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import VerificationForm from "../components/VerificationForm.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    userId: "",
    username: "",
  });

  const [isSubmitFrom, setIsSubmitForm] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerificationCodeSubmitted, setIsVerificationCodeSubmitted] =
    useState(false);

  const handleSubmitLoginForm = useCallback((userId, username) => {
    setRequest(() => ({
      userId,
      username,
    }));

    setIsSubmitForm(true);
  }, []);

  const handleSubmitVerificationCode = useCallback((token) => {
    setIsVerificationCodeSubmitted(true);
    login(token);
    navigate("/");
  }, []);

  const handleForgotPassword = useCallback((email) => {
    console.log("ppppp")
    setIsForgotPassword(true);
  }, []);

  const renderLoginBox = () => {
    if (isForgotPassword) {
       return (
        <VerificationForm
          onSubmit={handleSubmitVerificationCode}
          request={request}
          action={"change-password"}
        />
      );

    }
    if (!isSubmitFrom) {
      return <LoginForm onSubmit={handleSubmitLoginForm} onForgotPassword={handleForgotPassword}/>;
    }

    if (!isVerificationCodeSubmitted) {
      return (
        <VerificationForm
          onSubmit={handleSubmitVerificationCode}
          request={request}
          action={"login"}
        />
      );
    }

 };


  return (
    <div> 
      <Navbar />
      {renderLoginBox()}
      <Footer />
    </div>
  );
};

export default Login;
