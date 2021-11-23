import React from 'react'
import { Grid, TextField } from '@material-ui/core';

export default function SearchBar({ type, functionName }) {
    return (
            <Grid item xs={12}>
                <TextField 
                inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }}
                label={type === "name" ? "Search by name" : type === "tag" ? "Search by tag" : null}
                variant="standard"
                fullWidth
                onChange={functionName} 
                />
            </Grid>
    )
}
