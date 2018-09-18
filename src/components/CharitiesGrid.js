import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import {getMatchedCauses} from '@api';
import msg from '@assets/i18n/en';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import getCurrentUser from '@selectors/getCurrentUser';
import ThanksDialog from '@components/utils/ThanksDialog'

const styles= theme => ({
  fbFriends:{
    padding:0,
    paddingLeft:theme.spacing.unit * 5,
    paddingBottom:theme.spacing.unit * 3,
  },
  graySection:{
    background:"#DDD",
    border:"1px solid #BDBDBD",
    textAlign:"center",
    marginLeft:theme.spacing.unit * 3,
    marginRight:theme.spacing.unit * 3,
    paddingBottom:theme.spacing.unit * 3
  },
  matchedCauses:{
    width: 350,
    margin: "0 auto",
    textAlign: "left"
  },
  showMore:{
    textAlign:'center',
    fontSize:16,
    margin: "40px auto",
    display: "block",
    color:"#ADADAD",
    textTransform: "initial"
  }
});

export class CharitiesGrid extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      causes:[],
      opened:false,
      btnDisabled:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGiveAmount = this.handleGiveAmount.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.dlgCallback = this.dlgCallback.bind(this);
    this.checkSelectedCharities =  this.checkSelectedCharities.bind(this);
  }

  componentDidMount(){
    const causes = getMatchedCauses({});
    const self = this;
    causes.then(function(res){
      
      if (res.msg == msg.SUCCESS){
        res.causes.forEach((item)=>{
          item.checked = true;
        });
        self.setState({causes:res.causes});
        res.causes.forEach(function(item){
          self.setState({[item.id]:true});
        });
      }
    })
  }

  handleChange = prop => event => {
    var {causes} = this.state;
    causes[prop].checked =  !causes[prop].checked;// event.target.checked;
    this.setState({causes});
    this.checkSelectedCharities();
    this.forceUpdate();

  };
  checkSelectedCharities(){
    var b=false;
    this.state.causes.forEach((item)=>{
      b = b||item.checked;
    });
    this.setState({btnDisabled:!b});
  }
  handleShowMore = ()=>{

  }
  handleGiveAmount(){
    // const { user } = this.props;
    // console.log("user: ", user);

    this.setState({opened:true});
  }
  dlgCallback(){
    this.setState({opened:false});
    this.props.history.push('/dashboard'); 
  }

  render() {
    const {classes, user} = this.props;
    const self = this;
    return (
      <div className="main-container">
        <div className={classes.fbFriends} >
          <Typography variant="subheading">
            Maybe a list of your FB friends who donated could scroll here?
          </Typography>
        </div>
       
        <div className={classes.graySection}>
          <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
            Your charity matches
          </Typography>
          <div className={classes.matchedCauses}>
            <FormControl 
              component="fieldset">
                <FormGroup>
                  {this.state.causes.map(function(item, id){
                    return <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={item.checked}
                          onChange={self.handleChange(id)}
                          value={item.id}
                        />
                      }
                      label={item.name||"Charity name"}
                    />
                  })}
                </FormGroup>
              </FormControl>
          </div>
          <Button type="submit" variant="contained" onClick={this.handleGiveAmount} className="login-button email-signin-button" disabled={this.state.btnDisabled}>
            {'Give $'+ user.donationAmount + ' per charity'}
          </Button>
          <Button  className={classes.showMore} onClick={this.handleShowMore}>
          Show me 5 more
          </Button>
        </div>
        <ThanksDialog
          open={this.state.opened}
          causes = {this.state.causes}
          username={user.fullName}
          amount={user.donationAmount}
          callback={this.dlgCallback}
        />
        
      </div>
    );
  }
}
const mapStateToProps =createSelector(
  getCurrentUser,
  (user) => ({
    user
  })
);

export default hot(module)(connect(mapStateToProps)(withStyles(styles)(CharitiesGrid)));