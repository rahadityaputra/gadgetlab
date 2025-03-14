import crypto from "crypto";

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 1000000).toString();
};


export default {
    generateVerificationCode
}
