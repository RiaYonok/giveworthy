import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { loginUser } from '@actions/users';
import { hot } from 'react-hot-loader';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import  {Link}  from  'react-router-dom';

const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto'
    },
    form:{
        width:300, 
        margin:'30px auto',
        display:'block'
    },
    signupLink:{
       textAlign:'center',
       fontSize:16,
       margin: "40px auto",
       display: "block",
       color:"#ADADAD",
       textTransform: "initial"
    }
}
export class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
        username:"",
        password:"",
        showPassword: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword(){
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleMouseDownPassword (event){
    event.preventDefault();
  };

  render() {
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Howdy!
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Let's get you logged in
        </Typography>
        <FormControl style={styles.form} >
          <InputLabel htmlFor="username">User Name/Email</InputLabel>
          <Input
            fullWidth
            id="username"
            type="email"
            value={this.state.username}
            onChange={this.handleChange('username')}
         />
        </FormControl>
        <FormControl style={styles.form} >
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            fullWidth
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button type="button" variant="contained"  className="login-button email-signin-button">
          Log In
        </Button>
        <Link to="/signup"  className="link-button"  >
            <Button  style={styles.signupLink}>
                Create an Account
            </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = () => ({});


export default hot(module)(connect(mapStateToProps, {
  loginUser 
})(Login));