import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles, withStyles  } from '@material-ui/styles';
import {signup} from './../../services/api/httpclient';
import axios, { post } from 'axios';

import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
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
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  },
  uploadButton:{
    marginTop: theme.spacing(1),
    display:'flex'
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
const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

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

  const [avatarfile, setAvatarFile] = useState(null);
  const handleChange = event => {
    event.persist();

    if (event.target.type == "file")
    {
      setAvatarFile(event.target.files[0])
    }
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

  const fileUpload =(file) => {
    const url = '/api/saveimages';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData,config)
  }

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = event => {
    event.preventDefault();
    fileUpload(avatarfile).then((response) =>{
      console.log(response.data);
      let payload = {
        "firstName" : formState.values.firstName,
        "lastName" : formState.values.lastName,
        "email": formState.values.email,
        "password": formState.values.password,
        "avatarurl": response.data['imageurl'],
      }
      signup(payload).then( ret=>{
        if (ret['data'].result == 'ok'){
          history.push('/sign-in');
        }
        else if (ret['data'].result == 'fail')
        {
          alert(ret['data'].message);
          history.push('/sign-up');
        }
        else{
          alert(ret['data'].error);
          history.push('/sign-up');
        }
      }, err => {
        alert(err.error);
        history.push('/sign-up');
      });
      },(error)=>{
      console.log(error);
    })
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
                width="400" height="150"/>
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
                onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Create new account
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom 
                  style={{fontFamily: 'Roboto-Regular', color: 'white'}}
                >
                  Use your email to create new account
                </Typography>
                <MyInput
                    id="outlined-multiline-static" 
                    error={hasError('firstName')}
                    fullWidth
                    helperText={
                      hasError('firstName') ? formState.errors.firstName[0] : null
                    }               
                    name="firstName"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.firstName || ''}
                    placeholder="First Name"
                    // className={classes.searchClass}
                    InputProps={{
                      disableUnderline: true,
                      className : classes.searchClassInput,  
                      classes: {input: props.classes['input']}
                    }}
                />
                <MyInput
                    id="outlined-multiline-static" 
                    error={hasError('lastName')}
                    fullWidth
                    helperText={
                      hasError('lastName') ? formState.errors.lastName[0] : null
                    }               
                    name="lastName"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.lastName || ''}
                    placeholder="Last Name"
                    // className={classes.searchClass}
                    InputProps={{
                      disableUnderline: true,
                      className : classes.searchClassInput,  
                      classes: {input: props.classes['input']}
                    }}
                />
                <MyInput
                    id="outlined-multiline-static"
                    error={hasError('email')}             
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
                <MyInput
                    id="outlined-multiline-static" 
                    fullWidth
                    name="uploadfile"
                    type="file"
                    onChange = {handleChange}
                    // className={classes.searchClass}
                    InputProps={{
                      disableUnderline: true,
                      className : classes.searchClassInput,  
                      classes: {input: props.classes['input']}
                    }}
                />

                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                    style={{fontFamily: 'Roboto-Regular', color: 'white'}}
                  >
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                      style={{fontFamily: 'Roboto-Medium', color: '#8eb4df'}}
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  className="pull-right"
                >
                  Sign up now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  style={{fontFamily: 'Roboto-Regular', color: 'white'}}
                >
                  Have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                    style={{fontFamily: 'Roboto-Medium', color: '#8eb4df'}}
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withStyles(styles)(withRouter(SignUp));
