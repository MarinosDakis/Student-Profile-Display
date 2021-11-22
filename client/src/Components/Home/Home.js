import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import axios from "axios";
import { Grid, Card, Typography, TextField } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';

export default function Home() {

    // required variables
    const classes = useStyles(); // for styling
    const [studentData, setStudentData] = useState(null); // stores data from API call
    const [filteredStudentData, setFilteredStudentData] = useState(null); // stores filtered data from API call

    // the following function retrieves information from the given API via a GET request and returns the values
    const fetchStudentData = () => {
        const url = "https://api.hatchways.io/assessment/students";
        return axios.get(url)
            .then((results) => {
                return results.data.students;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // end fetchStudentData function

    // The useEffect calls the fetchStudentData function during initial render and then stores it to be used later
    useEffect(() => {
        fetchStudentData().then((apiData) => {
            setStudentData(apiData);
            setFilteredStudentData(apiData);
        });
    }, []);
    // end useEffect

    // this function filters students by their first and last names based on the inputted value from the search bar
    const searchStudent = (e) => {

        // store value from input
        const filterString = e.target.value.toLowerCase();

        // make current filter data to null
        setFilteredStudentData(null);

        // filter the json api data with the given search value from all the students' first and last name
        const filter = studentData.filter((data) => 
            (data.firstName + " " + data.lastName).toLowerCase().includes(filterString));

        // set the filtered data
        setFilteredStudentData(filter);
    }
    // end of searchStudent function

    // average function calculates the average of a given array. [All elements of array are added and then it is divided by the number of elements]
    const average = (array) => (array.reduce((a, b) => parseInt(a) + parseInt(b)) / array.length).toFixed(3);
    // end average function

    // initially the studentData useState variable is set to null, so we put this here. After the useEffect the value is filled
    if (!studentData || !filteredStudentData) return null;

    return (
        <div>
            <Grid container className={classes.root} spacing={3}>
                {/* Search by student name */}
                <Grid item xs={12}>
                    <TextField inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }} label="Search by name" variant="standard" fullWidth onChange={searchStudent} />
                </Grid>
            </Grid>
            {filteredStudentData.map((item) => (
                <Card key={item.firstName} className={classes.text}>
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
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </div>
    )
}