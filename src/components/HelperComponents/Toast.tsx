import { useState, useImperativeHandle, forwardRef } from 'react';
import { Toast } from 'react-bootstrap';

type ToastMessageProps = {
  initialSuccessToast: boolean;
  initialMessage: string;
};

export type ToastMessageHandle = {
  toggleShow: () => void;
  setMessage: (message: string) => void;
  setSuccess: (success: boolean) => void;
};

const ToastMessage = forwardRef<ToastMessageHandle, ToastMessageProps>(({ initialSuccessToast, initialMessage }, ref) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [successToast, setSuccess] = useState(initialSuccessToast);

  const toggleShow = () => setShow(!show);

  useImperativeHandle(ref, () => ({
    toggleShow,
    setMessage,
    setSuccess
  }));

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
    >
      <Toast className={successToast ? "toast-success" : "toast-error"} show={show} onClose={toggleShow} delay={5000} autohide={true}>
        <Toast.Header>
          <strong className="mr-auto">{successToast ? "Success" : "Error"}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
});

export default ToastMessage;
