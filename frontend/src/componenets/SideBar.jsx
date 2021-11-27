import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconPeople from '@material-ui/icons/People';
import IconBarChart from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ReportIcon from '@material-ui/icons/Report';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function AppMenu() {
  const drawerWidth = 240;
  const useStyles = makeStyles(() => createStyles({
    appMenu: {
      width: '80%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
      color: 'white',
    },
    menuItemIcon: {
      color: 'white',
    },
    DrawerHeader: {
      color: 'white',
      backgroundColor: '#10285d',
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" component="h2" className={classes.DrawerHeader}>
        THMInsight
      </Typography>
      <Divider />
      <List component="nav" className={classes.appMenu} disablePadding>
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconBarChart />
          </ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconPeople />
          </ListItemIcon>
          <ListItemText primary="Alerts" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <AddLocationIcon />
          </ListItemIcon>
          <ListItemText primary="Map" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Planning" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Help Center" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );
}

export default AppMenu;
