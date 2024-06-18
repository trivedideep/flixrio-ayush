function Resetpassvali(restvalues) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const password_pattern = /^[a-zA-Z0-9$_@&]{8,}$/;

  if (restvalues.restEmail === "") {
    error.restEmail = "Email should not be empty";
  } else if (!email_pattern.test(restvalues.restEmail)) {
    error.restEmail = "Email Didn't match";
  } else {
    error.restEmail = "";
  }

  if (restvalues.restpass1 === "") {
    error.restpass1 = "Password should not be empty";
  } else if (!password_pattern.test(restvalues.restpass1)) {
    error.restpass1 = "Password must have 8 charecter";
  } else {
    error.restpass1 = "";
  }

  if (restvalues.restpass2 === "") {
    error.restpass2 = "Password should not be empty";
  } else if (restvalues.restpass1 !== restvalues.restpass2) {
    error.restpass2 = "Password not match";
  } else {
    error.restpass2 = "";
  }

  return error;
}

export default Resetpassvali;
