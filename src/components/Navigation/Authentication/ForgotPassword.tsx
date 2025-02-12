import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { forgotPasswordRequest, confirmForgotPassword } from './authService';
import ToastMessage, { ToastMessageHandle } from '../../HelperComponents/Toast';
import { showToast } from '../../../helpers/UserHelper';



const ForgotPasswordPage = () => {
  
  const toastRef = useRef<ToastMessageHandle>(null);

  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line
  const [email, setEmail] = useState(location.state?.email || '');
  const [passworResetCode, setPasswordResetCode] = useState('');
  const [sentRequest, setSentRequest] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleForgotPasswordRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgotPasswordRequest(email);
      showToast(toastRef, "Password reset code has been sent to your email", true);
      setSentRequest(true)
    } catch (error) {
      console.log(`Failed to confirm account: ${error}`);
      showToast(toastRef, "Failed to confirm account", false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast(toastRef, "Passwords do not match", false);
      return;
    }

    try {
      await confirmForgotPassword(email, passworResetCode, password);
      showToast(toastRef, "Password has successfully been reset", true);
      navigate('/login');
    } catch (error) {
      console.log(`Failed to confirm account: ${error}`);
      showToast(toastRef, "Failed to confirm account", false);
    }
  };

return (
  <>
    <ToastMessage ref={toastRef} initialSuccessToast={true} initialMessage="Initial message" />

    <section className="container forms">
        <div className="form login">
            <div className="form-content">
            <h2 className='welcome-text'>Forgot password</h2>
              <form onSubmit={sentRequest ? handleForgotPasswordSubmit : handleForgotPasswordRequest}>
                  <div className="field input-field">
                    <input
                      className="input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  </div>
                  {
                    sentRequest && (
                      <>
                      <div className="field input-field">
                        <input
                          className="input"
                          type="text"
                          value={passworResetCode}
                          onChange={(e) => setPasswordResetCode(e.target.value)}
                          placeholder="Password Reset Code"
                          required />
                      </div>

                      <div className="field input-field">
                          <input
                            className="password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            />
                          <i className='bx bx-hide eye-icon'></i>
                      </div>

                      <div className="field input-field">
                        <input
                          className="input"
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          required
                        />
                      </div>
                        </>
                    )
                  }
                  <div className="field button-field">
                    <button type="submit">Reset Password</button>
                  </div>
              </form>
            </div>
        </div>
    </section>
  </>
);

};

export default ForgotPasswordPage;
