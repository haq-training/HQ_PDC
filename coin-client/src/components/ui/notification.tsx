import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type NotificationProps = {
    message: string;
};

const Notification: React.FC<NotificationProps> = ({ message }) => {
    useEffect(() => {
        if (message) {
            toast.info(message, {
                position: 'top-right',
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [message]);

    return (
        <ToastContainer
            position="top-right"
            autoClose={6000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export default Notification;
