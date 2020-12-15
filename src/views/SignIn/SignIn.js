import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {signin} from './../../services/api/httpclient';
import { makeStyles, withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';
import {setUserName} from './../../js/actions'
import {setUserToken} from './../../js/actions'
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    fontFamily: 'Roboto-Bold'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundImage: 'url(/images/auth.jpg)',
    backgroundImage: 'radial-gradient(#1b2d5e, #0f1e35)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundImage: 'radial-gradient(#1b2d5e, #0f1e35)',
    backgroundColor: '#15244c'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    color: 'white',
    fontFamily: 'Roboto-Bold'
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  inputClass:{
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    backgroundColor: '#132245',
    input:{
      '&::placeholder': {
        color: 'blue'
      }
    }
  },
  input: {
    color: 'white'
  },
  searchClassInput:{
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
  }
}));
const styles = {
  'input-label': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  },

  'input': {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#8eb4df'
    }
  }
};

const MyInput = withStyles({
  root: {
      backgroundColor: '#132245',
      width: '100%',
      padding: '10px',
      marginTop: '10px'
  },

})(TextField);

const SignIn = (props) => {
  const { history, dispatch} = props;

  const classes = useStyles();

  const [text, setText] = React.useState('');
  const handleContentChanged = (event, newAlignment) => {
    if (newAlignment !== null) {
      setText(newAlignment);
    }
  }

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    let payload = {
      "email": formState.values.email,
      "password": formState.values.password
    }

    signin(payload).then( ret=>{
      if (ret['data'].result == 'ok'){
        console.log(ret['data']);
        localStorage.setItem('access_token', ret['data']['access_token']);
        dispatch(setUserName(ret['data']['name'], ret['data']['email'], ret['data']['image']));
        dispatch(setUserToken(ret['data']['access_token']));
        history.push({
          pathname :'/dashboard',
          data : ret['data']
        });
      }
      else if(ret['data'].result == 'fail'){
        alert(ret['data'].message);
        history.push('/sign-up');
      }
      else {
        alert(ret['data'].error);
        history.push('/sign-up');
      }
    }, err => {
      alert(err.error);
      history.push('/sign-up');
    });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <img
                alt="big_log"
                src="/images/big_log.png" 
                width="300" height="150"/>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>
                <MyInput
                    id="outlined-multiline-static" 
                    error={hasError('email1')}                  
                    placeholder="Email Address"
                    value={formState.values.email || ''}
                    name="email"
                    onChange={handleChange}
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
                    }
                    // className={classes.searchClass}
                    InputProps={{
                      disableUnderline: true,
                      className : classes.searchClassInput,  
                      classes: {input: props.classes['input']}
                    }}
                />
                <MyInput
                    id="outlined-multiline-static" 
                    error={hasError('password')}
                    fullWidth
                    helperText={
                      hasError('password') ? formState.errors.password[0] : null
                    }                 
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    placeholder="Password"
                    // className={classes.searchClass}
                    InputProps={{
                      disableUnderline: true,
                      className : classes.searchClassInput,  
                      classes: {input: props.classes['input']}
                    }}
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <div style={{display: 'flex'}}>
                  <Typography
                      variant="body1"
                  >
                    <Link
                      component={RouterLink}
                      to="/forgot"
                      variant="h6"
                      style={{fontFamily: 'Roboto-Medium', color: '#8eb4df'}}
                    >
                      Forgot Password?
                    </Link>
                  </Typography>
                  <div style={{flexGrow: 1}}/>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                    style={{fontFamily: 'Roboto-Regular', color: 'white'}}
                  >
                    Not on TraFish yet?{' '}
                    <Link
                      component={RouterLink}
                      to="/sign-up"
                      variant="h6"
                      style={{fontFamily: 'Roboto-Medium', color: '#8eb4df'}}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </div>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default connect()(withStyles(styles)(withRouter(SignIn)));
