import { useState } from 'react';
import axios from 'axios';

const useEmailValidation = () => {
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = async (email) => {
        try {
            const response = await axios.post('http://localhost:8080/check-email', { email });
            
            if (response.data.exists) {
                setIsEmailValid(false);
            } else {
                setIsEmailValid(true);
            }
        } catch (error) {
            console.error('Error validating email:', error);
        }
    };
    return { isEmailValid, validateEmail };
};

export default useEmailValidation;
