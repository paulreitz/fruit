import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (e, val) => {
        setValue(val);
    }

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" centered>
                        <Tab component={Link} to="/" label="Add Fruit" disableRipple />
                        <Tab component={Link} to="/list" label="Fruit List" disableRipple />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Box className={classes.toolbarMargin}></Box>
        </React.Fragment>
    )
}