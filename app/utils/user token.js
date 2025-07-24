const createToken = (user) => {
    return {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizer: user.organizer
    }
}

export { createToken };