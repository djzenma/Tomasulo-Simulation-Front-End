import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
    secondaryBar: {
        zIndex: 0,
        marginBottom: "10px",
    },
    root: {
        flexGrow: 1,
    },
};

const team = ['Mazen Amr', 'Mohamed Ads', 'Khaled Soliman', 'Bassant Sammy', 'Amr ElSElimy'];
const NavBar = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className="mt-5" variant="h4" color="inherit" gutterBottom>
                        Tomasolo Algorithm Simulation
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppBar component="div" className={classes.secondaryBar} position="static">
                <Toolbar>
                    {team.map((member) => {
                        return (
                            <Typography className="p-2" variant="subtitle1" color="inherit" gutterBottom>
                                {member}
                            </Typography>
                        )})}
                    </Toolbar>
            </AppBar>
        </div>
    )
};
export default withStyles(styles)(NavBar);