// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp } from './authService';
import { showToast } from '../../../helpers/UserHelper';
import ToastMessage, { ToastMessageHandle } from '../../HelperComponents/Toast';

const ConfirmUserPage = () => {

  const toastRef = useRef<ToastMessageHandle>(null);

  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line
  const [email, setEmail] = useState(location.state?.email || '');
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await confirmSignUp(email, confirmationCode);
      showToast(toastRef, "Account confirmed successfully!\nSign in on next page.", true);
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
           <h2 className='welcome-text'>Confirm Account</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="field input-field">
                <input
                  className="input"
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Confirmation Code"
                  required />
                </div>
                <div className="field button-field">
                  <button type="submit">Confirm Account</button>
                </div>
            </form>
           </div>
       </div>
   </section>
</>
);

};

export default ConfirmUserPage;
