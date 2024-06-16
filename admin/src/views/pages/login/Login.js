import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBSpinner
} from 'mdb-react-ui-kit';
import Loginvali from './Loginvali';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CButton } from '@coreui/react';

function Login() {
  const [values, setValues] = useState({
    a_name: '',
    pass: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Loginvali(values);
    setErrors(validationErrors);

    if (!validationErrors.a_name && !validationErrors.pass) {
      setLoading(true);
      axios.post('http://localhost:8090/alogin', values)
        .then(res => {
          console.log(res.data);
          setLoading(false);

          if (res.data === "Success") {
            navigate('/Dashboard');
          } else {
            alert("User does not exist");
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <p className="text-white-50 mb-3">Please enter your login and password!</p>

                <MDBInput 
                  wrapperClass='mb-4 w-100' 
                  label='Username' 
                  id='formControlLg' 
                  type='email' 
                  size="lg" 
                  name='a_name' 
                  onChange={handleInput} 
                />
                {errors.a_name && <span className='text-danger'>{errors.a_name}</span>}

                <MDBInput 
                  wrapperClass='mb-4 w-100' 
                  label='Password' 
                  id='formControlLg' 
                  type='password' 
                  size="lg" 
                  name='pass' 
                  onChange={handleInput} 
                />
                {errors.pass && <span className='text-danger'>{errors.pass}</span>}

                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                <CButton size='lg' type="submit" color="primary" disabled={loading}>
                  {loading ? <MDBSpinner size="sm" role="status" tag="span" className="me-2" /> : 'Login'}
                </CButton>

                <hr className="my-4" />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default Login;
