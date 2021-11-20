import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import axios from "axios";
import { Grid, Card, Typography } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';

export default function Home() {

    // required variables
    const classes = useStyles(); // for styling
    const [studentData, setStudentData] = useState(null); // stores data from API call

    // the following function retrieves information from the given API via a GET request and returns the values
    const fetchStudentData = async () => {
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
        });
    }, []);
    // end useEffect

    // average function calculates the average of a given array. [All elements of array are added and then it is divided by the number of elements]
    const average = (array) => (array.reduce((a, b) => parseInt(a) + parseInt(b)) / array.length).toFixed(3);
    // end average function

    // initially the studentData useState variable is set to null, so we put this here. After the useEffect the value is filled
    if (!studentData) return null;

    // studentList variables creates JSX using the information from API to be displayed.
    const studentList = studentData.map((item, index, { length }) => (
        <Card key={item.firstName} className={classes.text}>
            <Grid container className={classes.root} spacing={3}>
                <Grid item>
                    {/* image of Student */}
                    <CardMedia
                        className={classes.img}
                        component="img"
                        image={item.pic}
                        height="150"
                        width="150"
                        alt={"profile of" + item.firstName + " " + item.lastName}>
                    </CardMedia>
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
    ));

    return (
        <div className={classes.container}>
            {studentList}
        </div>
    )
}