import axios from "axios";

// the following function retrieves information from the given API via a GET request and returns the values
export const fetchStudentData = () => {
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

// average function calculates the average of a given array. [All elements of array are added and then it is divided by the number of elements]
export const average = (array) => (array.reduce((a, b) => parseInt(a) + parseInt(b)) / array.length).toFixed(3);
// end average function
