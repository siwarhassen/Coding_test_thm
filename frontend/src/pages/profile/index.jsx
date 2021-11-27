import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SideBar from '../../componenets/SideBar';
import Profile from '../../componenets/Profile/index';
import AppBarSide from '../../componenets/AppBar';

const useStyles = makeStyles({
  paper: {
    background: '#153376 ',
  },
});
function ProfilePage() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBarSide />
      <Drawer
        variant="permanent"
        classes={{ paper: classes.paper }}
      >
        <SideBar />
      </Drawer>
      <main>
        <Container maxWidth="lg">
          <Profile />
        </Container>
      </main>
    </div>
  );
}
export default ProfilePage;
