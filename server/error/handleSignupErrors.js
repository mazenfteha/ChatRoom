const alertError = (err) => {
    let errors = {name : '', email: '', password: ''}

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports = alertError