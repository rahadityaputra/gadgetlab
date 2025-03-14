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

  const renderLoginBox = () => {
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

    if (isForgotPassword) {
       return (
        <VerificationForm
          onSubmit={handleSubmitVerificationCode}
          request={request}
          action={"change-password"}
        />
      );

    }
  };

  const handleForgotPassword = (email) => {
    setIsForgotPassword(true);
  }


  return (
    <>
      <Navbar />
      {renderLoginBox()}
      <Footer />
    </>
  );
};

export default Login;
