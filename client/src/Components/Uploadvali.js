function Uploadvali(values) {
  let error = {};

  const desc_pattern = /^[a-zA-Z0-9@.,-\s]{1,}$/;
  const video_pattern = /^.*\.(mp4)$/i;

  // Validate video name
  if (values.name === "") {
    error.name = "Video Name should not be empty";
  } else if (!desc_pattern.test(values.name)) {
    error.name = "Invalid name";
  } else {
    error.name = "";
  }

  // Validate description
  if (values.desc === "") {
    error.desc = "Description should not be empty";
  } else if (!desc_pattern.test(values.desc)) {
    error.desc = "Description invalid";
  } else {
    error.desc = "";
  }

  // Validate file upload
  if (!values.file) {
    error.file = "File should not be empty";
    console.log(values.file.name);
  } else if (!video_pattern.test(values.file.name)) {
    error.file = "Invalid file type. Only MP4 files are allowed.";
  } else {
    error.file = "";
  }

  // Validate category
  if (!values.category || values.category === "") {
    error.category = "Please select a category";
  } else {
    error.category = "";
  }

  return error;
}

export default Uploadvali;
