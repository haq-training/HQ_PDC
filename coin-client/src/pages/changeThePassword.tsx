import React, { useReducer, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from '@/layouts/_root-layout';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import Notification from '@/components/ui/notification';

type State = {
    userPassOld: string;
    userPassNew: string;
    userPassRetype: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
};

const initialState: State = {
    userPassOld: '',
    userPassNew: '',
    userPassRetype: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false,
};

type Action =
    | { type: 'setCurrentPassword'; payload: string }
    | { type: 'setNewPassword'; payload: string }
    | { type: 'setConfirmPassword'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'changePasswordSuccess'; payload: string }
    | { type: 'changePasswordFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setCurrentPassword':
            return {
                ...state,
                userPassOld: action.payload,
            };
        case 'setNewPassword':
            return {
                ...state,
                userPassNew: action.payload,
            };
        case 'setConfirmPassword':
            return {
                ...state,
                userPassRetype: action.payload,
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload,
            };
        case 'changePasswordSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false,
            };
        case 'changePasswordFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true,
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload,
            };
        default:
            return state;
    }
};

function ChangePassword() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [notification, setNotification] = useState('');
    const router = useRouter();
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setCurrentPassword',
            payload: event.target.value,
        });
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setNewPassword',
            payload: event.target.value,
        });
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setConfirmPassword',
            payload: event.target.value,
        });
    };

    const handlePasswordUpdate = async (e) => {
        const { userPassOld, userPassNew, userPassRetype } = state;

        if (!userPassOld.trim() || !userPassNew.trim() || !userPassRetype.trim()) {
            dispatch({
                type: 'changePasswordFailed',
                payload: 'Please fill in all fields',
            });
            toast.info('Please fill in all fields');
        }
        if (userPassNew !== userPassRetype) {
            dispatch({
                type: 'changePasswordFailed',
                payload: 'Mật khẩu mới và mật khẩu xác nhận không khớp',
            });
            toast.error('Mật khẩu mới và mật khẩu xác nhận không khớp');
            setNotification('Mật khẩu mới và mật khẩu xác nhận không khớp');
        }
        try {
            e.preventDefault();
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

            if (!token) {
                dispatch({
                    type: 'changePasswordFailed',
                    payload: 'User token not found',
                });
                toast.error('User token not found');
                return;
            }
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.idUser;
            const response = await axios.put(
                `http://localhost:4003/users/update-pass/${userId}`,
                {
                    userPassOld,
                    userPassNew,
                    userPassRetype,
                },
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                    method: 'PUT',
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: 'changePasswordSuccess',
                    payload: 'Đổi mật khẩu thành công',
                });
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
                toast.success('Đổi mật khẩu thành công');
                setNotification('Đổi mật khẩu thành công');
                router.push(routes.login);
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'changePasswordFailed',
                payload: 'Mật khẩu sai',
            });
            toast.info('Mật khẩu sai');
            setNotification('Mật khẩu sai');
        }
    };

    return (
        <RootLayout>
            <form className="w-400 mx-auto flex flex-wrap justify-center" noValidate autoComplete="off">
                <Card className="mt-10">
                    <CardHeader className="bg-gray-900 text-center text-white" title="Đổi mật khẩu" />
                    <CardContent>
                        <div>
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="currentPassword"
                                type="password"
                                label="Mật khẩu hiện tại"
                                placeholder="Mật khẩu hiện tại"
                                margin="normal"
                                onChange={handlePasswordChange}
                            />
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="newPassword"
                                type="password"
                                label="Mật khẩu mới"
                                placeholder="Mật khẩu mới"
                                margin="normal"
                                onChange={handleNewPasswordChange}
                            />
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="confirmPassword"
                                type="password"
                                label="Xác nhận mật khẩu"
                                placeholder="Xác nhận mật khẩu"
                                margin="normal"
                                onChange={handleConfirmPasswordChange}
                            />
                            {state.isError && <p className="text-red-500">{state.helperText}</p>}
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="large"
                            className="flex-grow"
                            onClick={handlePasswordUpdate}
                            disabled={!state.userPassOld || !state.userPassNew || !state.userPassRetype}
                        >
                            Lưu mật khẩu
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <Notification message={notification} />
        </RootLayout>
    );
}

export default ChangePassword;
