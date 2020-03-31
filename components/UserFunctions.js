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
            userInput: user.userInput,
            password: user.password
        })
        .then(response => {
            if(response.data==="invalid username or email"){
                console.log(`invalid username or password`)
                alert(`invalid username and password combination`)
            }
            else {
                console.log(`response is good`)
                localStorage.setItem('usertoken', response.data.token)
            return response.data
            }
        })
        .catch(err => {
            console.log(err)
        })
}