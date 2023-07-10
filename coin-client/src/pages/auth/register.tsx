import Link from 'next/link';
import React, { useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
import httpClient from '@/data/utils/client';
import routes from '@/config/routes';
import {useRouter} from 'next/router';

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
    | { type: 'setUsername'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'registerSuccess'; payload: string }
    | { type: 'registerFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'registerSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'registerFailed':
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

function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const handleRegister = async (e) => {
    if (state.username.trim() && state.password.trim()) {
      try {
        e.preventDefault();
      await httpClient.post('/users/register', {
          userName: state.username,
          userPass: state.password,
        });
        dispatch({
          type: 'registerSuccess',
          payload: 'Registration Successful',
        });
        router.push(routes.login);
      } catch (error) {
        console.error(error);
        dispatch({
          type: 'registerFailed',
          payload: 'Registration Failed',
        });
      }
    } else {
      dispatch({
        type: 'registerFailed',
        payload: 'Please fill in all fields',
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
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            className="mt-2 flex-grow ml-60"
            onClick={handleRegister}
            disabled={!state.username || !state.password }
          >
            Đăng Ký
          </Button>
        </CardActions>
      </Card>
    </form>
);
}

export default RegisterPage;
