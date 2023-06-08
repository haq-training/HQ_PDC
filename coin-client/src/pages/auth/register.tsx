import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
      marginTop: theme.spacing(15),
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10),
    }
  })
);

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
function RegisterPage() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRegister = () => {
    if (state.username.trim() && state.password.trim() && state.confirmPassword.trim()) {
      if (state.password === state.confirmPassword) {
        dispatch({
          type: 'registerSuccess',
          payload: 'Registration Successful'
        });
      } else {
        dispatch({
          type: 'registerFailed',
          payload: 'Password and Confirm Password do not match'
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
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Đăng ký" />
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
          <Button
            size="large"
            className={classes.loginBtn}
            onClick={handleRegister}
            disabled={!state.username || !state.password || !state.confirmPassword}
          >
            <Link href="/auth/login">Đăng Ký</Link>
          </Button>

        </CardActions>
      </Card>
    </form>
);
}

export default RegisterPage;
