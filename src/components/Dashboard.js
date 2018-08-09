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
    paddingBottom:theme.spacing.unit * 5,
    paddingTop:theme.spacing.unit * 7,
    paddingLeft:theme.spacing.unit*2,
    paddingRight:theme.spacing.unit*2
  },
  section:{
    margin:40,
  },
  carouselContainer:{
    minHeight:360,
    position:"relative",
    "overflow-x":"hidden",
    "overflow-y":"overlay",
  },
  carouselItemsSection:{
    position:"absolute",
    left:0,
    top:0,
    display:"flex"
  },
  carouselItem:{
    width:300,
    padding:10
  },
  carouselButtons:{
    display: "flex",
    justifyContent: "flex-end"
  },
  infoDesc:{
    fontSize:26,
    fontWeight:'400',
    color:"#757575"
  },
  postDesc:{
    fontSize:30,
    fontWeight:'400',
    color:"#757575"
  },
  videoDesc:{
    fontSize:16,
    fontWeight:'400',
    color:"#757575",
    lineHeight:"1.8em"
  },
  userinfo:{
    marginBottom:30
  },
  post:{
    marginBottom:30,
  },
  paper:{
    height:300,
    border:"1px solid #BDBDBD",
    background:"#DFDFDF",
    borderRadius:5,
    padding:10
  }
});

export class Dashboard extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      sliderLeft:0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCarouselDir = this.handleCarouselDir.bind(this);
  }

  componentDidMount(){
   
  }

  handleChange = prop => event => {
    
  };
  handleCarouselDir= dir => event =>{
    const itemsEl = ReactDom.findDOMNode(this.refs.carouselSection),
          containerEl = ReactDom.findDOMNode(this.refs.carouselContainer),
          step = 100;
    const ws = itemsEl.getBoundingClientRect().width, 
          wc = containerEl.getBoundingClientRect().width;
    var v = this.state.sliderLeft-dir*step;
    if(wc-v>ws) v= wc-ws;
    if (v>0 ) v= 0;
    this.setState({sliderLeft:v});
  }
  render() {
    const {classes, user} = this.props;
    const self = this;
    var username = user.fullName||user.familyName||user.givenName;
    var totalDonatedAmount = 300,
        percentile = 30,
        totalCauese=30;
    const posts =[{
      imageUrl:avatar,
      name:"InYaSchool",
      type:"video"
    },{
      imageUrl:avatar,
      name:"Allthenature",
      type:"photo"
    }];
    const donatedItems =[{
      imageUrl:avatar,
      videoUrl:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      name:"InYaSchool",
      desc:"dsfkjsirrjkerjnd sdkfsdlfkjoi rkjsldkfjosdf sdfksldfjsiodofhdsf"
    },{
      imageUrl:avatar,
      videoUrl:"https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1",
      name:"InYaSchool",
      desc:"dsfkjsirrjkerjnd sdkfsdlfkjoi rkjsldkfjosdf sdfksldfjsiodofhdsf"
    },{
      imageUrl:avatar,
      videoUrl:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      name:"InYaSchool",
      desc:"dsfkjsirrjkerjnd sdkfsdlfkjoi rkjsldkfjosdf sdfksldfjsiodofhdsf"
    },{
      imageUrl:avatar,
      videoUrl:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      name:"InYaSchool",
      desc:"dsfkjsirrjkerjnd sdkfsdlfkjoi rkjsldkfjosdf sdfksldfjsiodofhdsf"
    }]
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
      }
    ]
    return (
      <div className="main-container">
        <div className={classes.fbFriends} >
          <Typography variant="subheading">
            Maybe a list of your FB friends who donated could scroll here?
          </Typography>
        </div>
       
        <div className={classes.graySection}>
          <div className={classes.userinfo}>
            <Grid container spacing={40}>
              <Grid item xs={12} sm={1}>
              </Grid>
              <Grid item xs={12} sm={3}>
                <UserAvatar 
                    size="240" 
                    name={username} 
                    src={user.imageURL} 
                    colors={['#BDBDBD']} 
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={40}>
                  <Grid item xs={12}>
                    <Typography variant="display2" align="left">
                      {`Hi ${username}!`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={5}>
                    <Typography className={classes.infoDesc} align="left">
                      you're given
                    </Typography>
                    <Typography variant="display3" align="left">
                      {`$${totalDonatedAmount.toFixed(2)}`}
                    </Typography>
                    <Typography className={classes.infoDesc} align="left">
                      {`to ${totalCauese} Causes`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography className={classes.infoDesc} align="left">
                      you're in the top
                    </Typography>
                    <Typography variant="display3" align="left">
                      {`${percentile}%`}
                    </Typography>
                    <Typography className={classes.infoDesc} align="left">
                      Of givers your age
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={classes.post}>
            {posts.map((item, id)=>{
              return(
                <div key={id} style={{padding:'10px 0'}}>
                  <div className='inline-flex'>
                     <UserAvatar 
                      size="48" 
                      name={item.name} 
                      src={item.imageURL} 
                      colors={['#BDBDBD']} 
                    />
                    <Typography className={classes.postDesc}>
                      {item.name + (item.type=='video'?' Just posted a thank you video':' crerated a new album')}
                    </Typography>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={classes.section}>
            <Typography variant="display1" align="center">
              See what you helped achieve
            </Typography>
            <div className={classes.carouselButtons} >
              <IconButton
                onClick={this.handleCarouselDir(1)}
                color="inherit"
              >
                <ArrowLeftIcon/>
              </IconButton>
              <IconButton
                onClick={this.handleCarouselDir(-1)}
                color="inherit"
              >
                <ArrowRightIcon/>
              </IconButton>
            </div>
            <div className={classes.carouselContainer} ref="carouselContainer">
              <div className={classes.carouselItemsSection} ref="carouselSection" style={{left:this.state.sliderLeft}}>
                {donatedItems.map((item, id)=>{
                  return (
                    <div key={id} className = {classes.carouselItem}>
                      <div style={{textAlign:"center"}}>
                        <div className='inline-flex'>
                          <UserAvatar 
                            size="48" 
                            name={item.name} 
                            src={item.imageURL} 
                            colors={['#BDBDBD']} 
                          />
                          <Typography className={classes.postDesc}>
                            {item.name}
                          </Typography>
                        </div>
                      </div>
                      <div style={{marginTop:20}}>
                        <VideoPlayer
                            playsinline
                            url={item.videoUrl}
                            controls
                            width ={"100%"}
                            height ={"100%"}
                        />
                      </div>
                      <div>
                        <p className={classes.videoDesc}>
                          {item.desc.length>60?(item.desc.substr(0,60)+"..."):item.desc}&nbsp;&nbsp;&nbsp;
                          {item.desc.length>60 && <Button variant="outlined" size="small"> Read More</Button>}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
        </div>    
        <div className={classes.section}>
            <Typography variant="display1" align="center" style={{marginBottom:15}}>
              Who you've donated to:
            </Typography>
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

export default hot(module)(connect(mapStateToProps)(withStyles(styles)(Dashboard)));