import React, { useReducer,useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
import httpClient from '@/data/utils/client';

type State = {
    userName: string;
    newPass: string;
    userAvatar: string;
    userCover: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
};

const initialState: State = {
    userName: '',
    newPass: '',
    userAvatar: '',
    userCover: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false,
};

type Action =
    | { type: 'setUserName'; payload: string }
    | { type: 'setNewPass'; payload: string }
    | { type: 'setUserAvatar'; payload: string }
    | { type: 'setUserCover'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'updateSuccess'; payload: string }
    | { type: 'updateFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUserName':
            return {
                ...state,
                userName: action.payload,
            };
        case 'setNewPass':
            return {
                ...state,
                newPass: action.payload,
            };
        case 'setUserAvatar':
            return {
                ...state,
                userAvatar: action.payload,
            };
        case 'setUserCover':
            return {
                ...state,
                userCover: action.payload,
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload,
            };
        case 'updateSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false,
            };
        case 'updateFailed':
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

function EditUser() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [userAvatar, setUserAvatar] = useState('');
    const [userCover, setUserCover] = useState('');


    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setUserName',
            payload: event.target.value,
        });
    };

    const handleNewPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setNewPass',
            payload: event.target.value,
        });
    };

    const handleUserAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAvatar(event.target.value);
    };

    const handleUserCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCover(event.target.value);
    };

    const handleUpdate = async () => {
        // Perform validation and update logic here
    };

    return (
        <form className="flex flex-wrap w-400 mx-auto justify-center" noValidate autoComplete="off">
            <Card className="mt-10">
                <CardHeader className="text-center bg-gray-900 text-white" title="Chỉnh sửa người dùng" />
                <CardContent>
                    <div>
                        <TextField
                            fullWidth
                            id="userName"
                            label="Tên người dùng"
                            placeholder="Tên người dùng"
                            margin="normal"
                            value={state.userName}
                            onChange={handleUserNameChange}
                        />
                        <TextField
                            fullWidth
                            id="newPass"
                            type="password"
                            label="Mật khẩu mới"
                            placeholder="Mật khẩu mới"
                            margin="normal"
                            value={state.newPass}
                            onChange={handleNewPassChange}
                        />
                        <TextField
                            fullWidth
                            id="userAvatar"
                            label="Ảnh đại diện"
                            placeholder="URL ảnh đại diện"
                            margin="normal"
                            value={userAvatar}
                            onChange={handleUserAvatarChange}
                        />

                        <TextField
                            fullWidth
                            id="userCover"
                            label="Ảnh bìa"
                            placeholder="URL ảnh bìa"
                            margin="normal"
                            value={userCover}
                            onChange={handleUserCoverChange}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        className="flex-grow"
                        onClick={handleUpdate}
                        disabled={state.isButtonDisabled}
                    >
                        Lưu
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default EditUser;
