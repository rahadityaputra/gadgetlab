import React, { useCallback, useState } from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import VerificationForm from "../components/VerificationForm.jsx";
import VerificationSuccess from "../components/VerificationSuccess.jsx";

const Register = () => {
  const [isRegisterSubmitted, setIsRegisterSubmitted] = useState(false);
  const [isVerificationCodeSubmitted, setIsVerificationCodeSubmitted] =
    useState(false);
  const [request, setRequest] = useState({
    userId : ""
  });

  const handleSubmitForm = useCallback((userId) => {
    setIsRegisterSubmitted(true);
    setRequest({userId});
  }, []);

  const handleBackToRegister = useCallback(() => {
    setIsRegisterSubmitted(false);
  }, []);

  const handleSubmitVerificationCode = useCallback(() => {
    setIsVerificationCodeSubmitted(true);
  }, []);

  const renderRegisterBox = () => {
    if (!isRegisterSubmitted) {
      return <RegisterForm onSubmit={handleSubmitForm} />;
    }

    return isVerificationCodeSubmitted ? (
      <VerificationSuccess />
    ) : (
      <VerificationForm
        onBack={handleBackToRegister}
        onSubmit={handleSubmitVerificationCode}
        request={request}
        action={"register"}
      />
    );
  };

  return (
    <>
      <Navbar />
      {renderRegisterBox()}
      <Footer />
    </>
  );
};

export default Register;
