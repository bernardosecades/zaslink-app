const contentValidator = (value) => {
    return  value.length > 0 && value.length < 10000
}

const passwordValidator = (value) => {
    return value.length === 0 || (value.length >= 4 && value.length <= 12)
}

export { contentValidator, passwordValidator }