import React from 'react'
import { Grid, TextField } from '@material-ui/core';
import useStyles from '../Home/styles';

export default function SearchBar({ type, handleChange }) {

    const classes = useStyles(); // for styling

    return (
        <Grid item xs={12}>
            <TextField
                inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }}
                label={type === "name" ? "Search by name" : type === "tag" ? "Search by tag" : null}
                name={type === "name" ? "studentName" : type === "tag" ? "studentTag" : null}
                variant="standard"
                fullWidth
                onChange={handleChange}
                className={classes.searchbar}
                InputLabelProps={{ style: { color: "black" } }}
            />
        </Grid>
    )
}
