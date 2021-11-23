import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Accordion from '../Accordian/Accordian';
import { fetchStudentData, average } from "../Data/Data";

export default function Home() {

    // required variables
    const classes = useStyles(); // for styling
    const [studentData, setStudentData] = useState(null); // stores data from API call
    const [filteredStudentData, setFilteredStudentData] = useState(null); // stores filtered data from API call

    // The useEffect calls the fetchStudentData function during initial render and then stores it to be used later
    useEffect(() => {
        fetchStudentData().then((apiData) => {
            setStudentData(apiData);
            setFilteredStudentData(apiData);
        });
    }, []);
    // end useEffect

    // this function filters students by their first and last names based on the inputted value from the search bar
    const SearchStudent = (e) => {

        // store value from input
        const filterString = e.target.value.toLowerCase();

        // filter the json api data with the given search value from all the students' first and last name
        const filter = studentData.filter((data) => (data.firstName + " " + data.lastName).toLowerCase().includes(filterString));

        // set the filtered data
        setFilteredStudentData(filter);
    }
    // end of searchStudent function

    // this function filters students by their first and last names based on the inputted value from the search bar
    const SearchTag = (e) => {

        // store value from input
        const filterString = e.target.value.toLowerCase();

        // filter the json api data with the given search value from all the students' first and last name
        const filter = studentData.filter((data) => {
            if (filterString === "") return data;
            if (data.tags === undefined) return null;
            if (data.tags.toString().toLowerCase().includes(filterString)) return data;
            return null;
        });

        // set the filtered data
        setFilteredStudentData(filter);
    }
    // end of searchStudent function

    // this function adds a tag to a selected student
    const addTag = (e, currentStudent) => {

        // store value from input
        const newTag = e.target.value;

        //add the current tag to the given student
        if (currentStudent.tags === undefined) {
            currentStudent.tags = [newTag];
        } else {
            currentStudent.tags.push(newTag);
        }

        // set the filter with current values so that the component can re-render
        const filter = studentData.filter((data) => data);

        setFilteredStudentData(filter);

        // clear the input after user enters tag keyword
        e.target.value = "";
    }
    // end of addTag function

    // initially the filteredStudentData useState variable is set to null, so we put this here. After the useEffect the value is filled
    if (!filteredStudentData) return null;

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container className={classes.root}>
                {/* Search by student name */}
                <Grid item xs={12}>
                    <TextField inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }} label="Search by name" variant="standard" fullWidth onChange={SearchStudent} />
                </Grid>
            </Grid>
            <Grid container className={classes.root}>
                {/* Search by student tag */}
                <Grid item xs={12}>
                    <TextField inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }} label="Search by tag" variant="standard" fullWidth onChange={SearchTag} />
                </Grid>
            </Grid>

            {filteredStudentData.map((item) => (
                <div key={item.firstName}>
                    <Grid container className={classes.root} spacing={3}>
                        <Grid item>
                            {/* image of Student */}
                            <CardMedia className={classes.img} component="img" image={item.pic} height="150" width="150" alt={"profile of" + item.firstName + " " + item.lastName}></CardMedia>
                        </Grid>
                        <Grid item>
                            {/* Student Full Name */}
                            <Typography variant="h1" className={classes.text}><strong>{(item.firstName + " " + item.lastName).toUpperCase()}</strong></Typography>
                            {/* Student Email */}
                            <Typography className={classes.text}>{"Email: " + item.email}</Typography>
                            {/* Student Company */}
                            <Typography className={classes.text}>{"Company: " + item.company}</Typography>
                            {/* Student Skill */}
                            <Typography className={classes.text}>{"Skill: " + item.skill}</Typography>
                            {/* Student Grade Average */}
                            <Typography className={classes.text}>{"Average: " + average(item.grades) + "%"}</Typography>

                            {/* Student tags */}
                            <Grid container>
                                {item.tags && item.tags.map((tag, index) => (
                                    <Grid item key={index}>
                                        <Typography className={classes.tags}>{tag}</Typography>
                                    </Grid>
                                ))}

                            </Grid>
                            <TextField className={classes.form} inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }} label="Add a tag" variant="standard" onKeyPress={e => e.key === "Enter" ? addTag(e, item) : null} />
                            <Grid item xs>
                            <div className={classes.accordian}>
                                <Accordion gradesArray={item.grades} />
                            </div>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                </div>
            ))}
        </Paper>
    )
}