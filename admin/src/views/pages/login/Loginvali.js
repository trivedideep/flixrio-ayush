function Loginvali(values)
{
    let error = {}

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const password_pattern = /^[a-zA-Z0-9@$&_]{8,}$/

if(values.a_name === "") {

error.a_name = "Name should not be empty"

}

else if(!email_pattern.test(values.a_name)) {

error.a_name = "Email Didn't match"

}else {

error.a_name = ""

}

if(values.pass === "") {

error.pass = "Password should not be empty"

}

else if(!password_pattern.test(values.pass)) {

error.pass = "Password didn't match"
}
 else { 

error.pass=""

}

return error;
}

export default Loginvali;