export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const isValidOTP = (otp) => {
    return otp.length === 6;
  };
  
  export const validatePasswords = (passwords) => {
    const { password, confirmPassword } = passwords;
    return {
      match: password === confirmPassword,
      len: password?.length === 0 || confirmPassword?.length === 0
    };
  };
  