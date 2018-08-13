import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import UserAvatar from 'react-user-avatar';
import msg from '@assets/i18n/en';
import { Button } from '@material-ui/core';
import getCurrentUser from '@selectors/getCurrentUser';
import avatar from '@assets/images/if_male_628288.svg';
import ArrowLeftIcon from '@material-ui/icons/NavigateBefore';
import ArrowRightIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import VideoPlayer from 'react-player';
import Paper from '@material-ui/core/Paper';
import noImage from '@assets/images/no-image.png';
const styles= theme => ({
  
  section:{
    margin:40,
  },
  paper:{
    height:300,
    border:"1px solid #BDBDBD",
    background:"#DFDFDF",
    borderRadius:5,
    padding:10
  },
  filterButton:{
      marginLeft:10,
      marginRight:10,
  }
});

export class CharityDashboard extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      filter:"all"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
   
  }

  handleChange = prop => event => {
    this.setState({filter:prop});
  };

  render() {
    const {classes} = this.props;
    const charities =[
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      },
      {
        imageUrl:noImage,
        name:"",
        website:""
      }
    ]
    return (
      <div className="main-container">
        <div className={classes.buttons}>
            <Button variant={this.state.filter=='all'?"outlined":'text'} size="large" onClick={this.handleChange('all')} className={classes.filterButton}>All</Button>
            <Button variant={this.state.filter=='social'?"outlined":'text'} size="large" onClick={this.handleChange('social')} className={classes.filterButton}>Social</Button>
            <Button variant={this.state.filter=='educational'?"outlined":'text'} size="large" onClick={this.handleChange('educational')} className={classes.filterButton}>Educational</Button>
            <Button variant={this.state.filter=='environmental'?"outlined":'text'} size="large" onClick={this.handleChange('environmental')} className={classes.filterButton}>Environmental</Button>
        </div>
        <div className={classes.section}>

            <Grid container spacing={40}>
            { charities.map((item,id)=>{
              return (
                <Grid item xs={12} sm={4} key={id}>
                  <Paper className={classes.paper}>
                     <img src={item.imageUrl} width={"100%"} height={200}/>
                     <Typography variant="subheading" gutterBottom>{(!item.name||item.name.length==0)?"Charity Name":item.name}</Typography>
                     <Typography variant="subheading" gutterBottom>{(!item.website||item.website.length==0)?"Charitewebsite.com":item.website}</Typography>
                  </Paper>
                </Grid>
              )
            })

            }
              
            </Grid>
        </div>
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

export default hot(module)(connect(mapStateToProps)(withStyles(styles)(CharityDashboard)));