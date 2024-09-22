import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const saveForm = async (data) => {
    try {
      const apiUrl = process.env.REACT_APP_AUTH_API + "/login";
      console.log("Data being sent:", data);
      const response = await axios.post(apiUrl, data);

      console.log("Response received:", response);
      
      if (response.status === 200) {
        const responseData = response.data;
        localStorage.setItem("token", responseData.token);
        navigate("/", { state: responseData.message });
      }
    } catch (error) {
      console.error("Error in request:", error);
    }
  };

  const styles = { container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f8fa',
  },
  formBox: {
    width: '360px',
    padding: '30px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'box-shadow 0.3s ease-in-out',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s ease-in-out',
    fontSize: '16px',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: '14px',
    margin: '5px 0',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease-in-out',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Login to Your Account</h1>
        <form name="loginForm" onSubmit={handleSubmit(saveForm)}>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            style={styles.input}
            onFocus={(e) => e.currentTarget.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.currentTarget.style.borderColor = styles.input.border}
          />
          {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            style={styles.input}
            onFocus={(e) => e.currentTarget.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.currentTarget.style.borderColor = styles.input.border}
          />
          {errors.password && <p style={styles.errorText}>{errors.password.message}</p>}
          <input
            type="submit"
            value="Login"
            style={styles.submitButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

