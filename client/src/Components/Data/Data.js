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
