import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from './authService';
// import { FaFacebook, FaGoogle } from 'react-icons/fa';
import './Authentication.css';
import ToastMessage, { ToastMessageHandle } from '../../HelperComponents/Toast';
import { showToast } from '../../../helpers/UserHelper';
import logo from './logo.png';



const LoginPage = () => {

  const toastRef = useRef<ToastMessageHandle>(null);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const session = await signIn(email, password);
      // console.log('Sign in successful', session);
      if (session && typeof session.AccessToken !== 'undefined') {
        sessionStorage.setItem('accessToken', session.AccessToken);
        if (sessionStorage.getItem('accessToken')) {
          window.location.href = '/home';
        } else {
          console.error('Session token was not set properly.');
        }
      } else {
        console.error('SignIn session or AccessToken is undefined.');
      }
    } catch (error) {
      console.log(`Sign in failed: ${error}`);

      var _error = `${error}`;

      if(_error.includes("NotAuthorizedException")){

        showToast(toastRef, "Incorrect username or password.", false);

      }else{
        showToast(toastRef, "Sign in failed", false);
      }
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast(toastRef, "Passwords do not match", false);
      return;
    }
    try {
      await signUp(email, password);
      navigate('/confirm', { state: { email } });
    } catch (error) {
      showToast(toastRef, "Sign up failed", false);
      console.log(`Sign up failed: ${error}`);
    }
  };

  const handleForgotPassword = () => {

    navigate('/forgot-password', { state: { email } });
  }

  return (
    <>
      <ToastMessage ref={toastRef} initialSuccessToast={true} initialMessage="Initial message" />
      <img className="site-logo" src={logo} alt="site logo" />
      <section className="container forms">
        <div className="form login">
            <div className="form-content">
            <h1 className='welcome-text'>Welcome</h1>
            <h4 className='welcome-text'>{isSignUp ? 'Sign up to create an account' : 'Sign in to your account'}</h4>
              <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                  <div className="field input-field">
                      <input 
                        className="input"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        />
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
                  {isSignUp && (
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
                  )}
                  {!isSignUp && (
                    <div className="form-link">
                      <a onClick={handleForgotPassword} className="forgot-pass">Forgot password?</a>
                  </div>
                  )}
                  <div className="field button-field">
                    <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                  </div>
              </form>
              <div className="form-link">
                  <span>{isSignUp ? 'Already have an account?' : 'Need an account?'} <a onClick={() => setIsSignUp(!isSignUp)} className="link signup-link">{isSignUp ? ' Sign In' : ' Sign Up'}</a></span>
              </div>
            </div>
            {/* <div className="line"></div>
            <div className="media-options">
                <a href="#" className="field facebook">
                    <FaFacebook className='facebook-icon' size={32} />
                    <span>Login with Facebook</span>
                </a>
            </div>
            <div className="media-options">
                <a href="#" className="field google">
                    <FaGoogle className='facebook-icon' size={32} style={{ color: '#DB4437' }} />
                    <span>Login with Google</span>
                </a>
            </div> */}
        </div>
      </section>
    </>
  );
};

export default LoginPage;
