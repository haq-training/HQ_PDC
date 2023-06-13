import axios from 'axios';
import Link from 'next/link';
import React, { useReducer } from 'react';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';


//state type

type State = {
  username: string
  password:  string
  confirmPassword: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState: State = {
  username: '',
  password: '',
  confirmPassword: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setConfirmPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'registerSuccess', payload: string }
  | { type: 'registerFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload
      };
    case 'setConfirmPassword':
      return {
        ...state,
        confirmPassword: action.payload
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'registerSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'registerFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
  }
};


const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:4003/users');
    console.log(response.data);
    // Xử lý dữ liệu trả về từ API nếu cần
  } catch (error) {
    console.error('Error:', error);
    // Xử lý lỗi nếu có
  }
};

getUsers();


function RegisterPage() {

  const [state, dispatch] = useReducer(reducer, initialState);


  const handleRegister = async () => {
    if (state.username.trim() && state.password.trim() && state.confirmPassword.trim()) {
      try {
        const response = await axios.post('http://localhost:4003/users/register', {
          username: state.username,
          password: state.password,
          // Thêm các thông tin khác nếu cần
        });
        console.log(response.data);
        dispatch({
          type: 'registerSuccess',
          payload: 'Registration Successful'
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: 'registerFailed',
          payload: 'Registration Failed'
        });
      }
    } else {
      dispatch({
        type: 'registerFailed',
        payload: 'Please fill in all fields'
      });
    }
  };


  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleRegister();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    };

  const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setConfirmPassword',
        payload: event.target.value
      });
    };


  return (
    <form className="flex flex-wrap w-400 mx-auto justify-center" noValidate autoComplete="off">
      <Card className="mt-10">
        <CardHeader className="text-center bg-gray-900 text-white" title="Đăng Ký" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="text"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handleConfirmPasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Link href="/auth/login" >
          <Button
            size="large"
            className="mt-2 flex-grow ml-60"
            onClick={handleRegister}
            disabled={!state.username || !state.password || !state.confirmPassword}
          >
            Đăng Ký
          </Button>
          </Link>
        </CardActions>
      </Card>
    </form>
);
}

export default RegisterPage;
