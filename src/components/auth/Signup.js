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
import Stepper from '@components/BarStepper';
import { ValidatorForm, InputValidator} from '@components/Validators';


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
export class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
        email:"",
        password:"",
        showPassword: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(){

      return false;
  }
  render() {
    var steps=[];
    for(var i=0;i<5;i++) steps.push(false);
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Sing up with Email
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Add your info below
        </Typography>
        <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                style={styles.form}
                onError={errors => console.log(errors)}
            >
             
            <InputValidator
                fullWidth
                id="email"
                name="email"
                ref="email"
                formControlStyle={styles.form}
                inputLabel="Email Address"
                type="email"
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                onChange={this.handleChange('email')}
            />
        
            <InputValidator
                fullWidth
                id="password"
                name="password"
                ref="password"
                formControlStyle={styles.form}
                inputLabel="Password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                validators={['required', 'minStringLength:8','maxStringLength:50']}
                errorMessages={['this field is required', 'Password length must be more than 8', 'Password length must be less than 50']}
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

            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            Next
            </Button>
        </ValidatorForm>
        <Stepper steps={steps}/>
      </div>
    );
  }
}

const mapStateToProps = () => ({});


export default hot(module)(connect(mapStateToProps, {
  loginUser 
})(Signup));