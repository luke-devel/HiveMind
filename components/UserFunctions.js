import axios from 'axios'

export const register = newUser => {
    return axios
        .post('/api/register', {
            username: newUser.username,
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

export const login = user => {
    return axios
        .post('/api/login', {
            email: user.username,
            email: user.email,
            password: user.password
        })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('usertoken', response.data.token)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}