import Link from 'next/link';
import React, { useReducer, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';

// State type
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
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
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
        case 'loginSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false,
            };
        case 'loginFailed':
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

function LoginPage() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false,
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true,
            });
        }
    }, [state.username, state.password]);

    const handleLogin = () => {
        if (state.username === 'admin' && state.password === '1234') {
            dispatch({
                type: 'loginSuccess',
                payload: 'Login Successfully',
            });
        } else {
            dispatch({
                type: 'loginFailed',
                payload: 'Incorrect username or password',
            });
        }
    };


    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            if (!state.isButtonDisabled) {
                handleLogin();
            }
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setUsername',
            payload: event.target.value,
        });
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setPassword',
            payload: event.target.value,
        });
    };

    return (
      <form className="flex flex-wrap w-400 mx-auto flex justify-center" noValidate autoComplete="off">
          <Card className="mt-10">
              <CardHeader className="text-center bg-gray-900 text-white" title="Đăng nhập" />
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
              <CardActions className="flex flex-col">
                  <div className="mb-2 w-full">
                      <Link href="/?layout=Minimal">
                      <Button
                        size="large"
                        className="flex-grow w-full"
                        onClick={handleLogin}
                        disabled={state.isButtonDisabled}
                      >
                         Đăng nhập

                      </Button>
                      </Link>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="text-sm text-gray-600">
                        Chưa có tài khoản?
                        <Link href="/auth/register">
                        <Button className="text-white-500 mt-5 ml-3 ">
                            Đăng ký ngay
                        </Button>
                        </Link>
                    </div>
                  </div>
              </CardActions>
          </Card>
      </form>
    );
}

export default LoginPage;