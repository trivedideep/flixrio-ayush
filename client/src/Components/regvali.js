function regvali(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const user_pattern = /^[a-zA-Z0-9]{3,}$/;
  const mono_pattern = /^[0-9]{10}$/;

  const password_pattern = /^[a-zA-Z0-9$_@&]{8,}$/;

  if (values.email === "") {
    error.email = "Name should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  } else {
    error.email = "";
  }

  if (values.username === "") {
    error.username = "Name should not be empty";
  } else if (!user_pattern.test(values.username)) {
    error.username = "user name invalid";
  } else {
    error.username = "";
  }

  if (values.Mono === "") {
    error.Mono = "Mobile no should not be empty";
  } else if (!mono_pattern.test(values.Mono)) {
    error.Mono = "mobile no length should be 10 no";
  } else {
    error.Mono = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password must have 8 charecter";
  } else {
    error.password = "";
  }

  return error;
}

export default regvali;
