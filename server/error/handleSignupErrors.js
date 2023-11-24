const alertError = (err) => {
    let errors = {name : '', email: '', password: ''}

    //login errors
    if(err.message === 'incorrect email') {
        errors.email = 'This email not found'
    }

    if(err.message === 'incorrect pwd') {
        errors.password = 'This pas is incorrect'
    }

    //duplicate account error
    if(err.code === 1100) {
        errors.email = 'This email already registered'
        return errors
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports = alertError