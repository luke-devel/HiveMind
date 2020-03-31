import axios from 'axios'

export const register = newUser => {
    return axios
        .post('/api/register', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log('Registered')
        })
        .catch(err => {
            console.log("Err sign up", err);
            alert("This email already used");
        });     
}