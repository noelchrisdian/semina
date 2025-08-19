const accessCategories = {
    read: ['organizer'],
    create: ['organizer'],
    update: ['organizer'],
    delete: ['organizer']
}

const accessTalents = {
    read: ['organizer'],
    create: ['organizer'],
    update: ['organizer'],
    delete: ['organizer']
}

const accessEvents = {
    read: ['organizer'],
    create: ['organizer'],
    update: ['organizer'],
    delete: ['organizer']
}

const accessParticipants = {
    read: ['organizer'],
    create: ['organizer'],
    update: ['organizer'],
    delete: ['organizer']
}

const accessPayments = {
    read: ['organizer'],
    create: ['organizer'],
    update: ['organizer'],
    delete: ['organizer']
}

const accessOrders = {
    read: ['organizer', 'admin', 'owner'],
    create: ['organizer', 'admin', 'owner'],
    update: ['organizer', 'admin', 'owner'],
    delete: ['organizer', 'admin', 'owner']
}

const accessUsers = {
    read: ['owner'],
    create: ['owner'],
    update: ['owner'],
    delete: ['owner']
}

const accessAdmin = {
    read: ['organizer'],
    create: ['organizer'],
    update: ['organizer'],
    delete: ['organizer']
}

export {
    accessAdmin,
    accessCategories,
    accessEvents,
    accessOrders,
    accessParticipants,
    accessPayments,
    accessTalents,
    accessUsers
}