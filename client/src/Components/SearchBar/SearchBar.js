import React from 'react'
import { Grid, TextField } from '@material-ui/core';

export default function SearchBar({ type, handleChange }) {
    return (
            <Grid item xs={12}>
                <TextField 
                inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }}
                label={type === "name" ? "Search by name" : type === "tag" ? "Search by tag" : null}
                name={type === "name" ? "studentName" : type === "tag" ? "studentTag" : null}
                variant="standard"
                fullWidth
                onChange={handleChange} 
                />
            </Grid>
    )
}
