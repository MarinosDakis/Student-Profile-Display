import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import axios from "axios";

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
    const studentList = studentData.map((item) => (
        <div key={item.firstName}>
            {/* image */}
            <div><img src={item.pic} alt={"profile of" + item.firstName + " " + item.lastName}></img></div>
            {/* Full Name */}
            <strong>{item.firstName + " " + item.lastName}</strong>
            {/* Email */}
            <div>{"Email: " + item.email}</div>
            {/* Company */}
            <div>{"Company: " + item.company}</div>
            {/* Skill */}
            <div>{"Skill: " + item.skill}</div>
            {/* Grade Average */}
            <div>{"Average: " + average(item.grades) + "%"}</div>
        </div>
    ));

    return (
        <div className={classes.container}>
            {studentList}
        </div>
    )
}