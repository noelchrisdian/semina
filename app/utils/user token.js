const createToken = (user) => {
    return {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizer: user.organizer
    }
}

const tokenParticipant = (participant) => {
    return {
        participantId: participant._id,
        email: participant.email,
        firstName: participant.firstName,
        lastName: participant.lastName
    }
}

export { createToken, tokenParticipant };