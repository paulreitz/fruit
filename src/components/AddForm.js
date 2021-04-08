import React, { useState } from 'react'
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import { setFruit } from '../store/actions/fruitActions';
import { serverCall } from '../utils/server';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('md')]: {
            width: 980,
            marginTop: 24
        },
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

export function AddForm(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.container}>Add Form</Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    fruit: state.fruit,
    nutrients: state.nutrients
});

const mapDispatchToProps = (dispatch) => ({
    setFruit: (fruit) => dispatch(setFruit(fruit))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);