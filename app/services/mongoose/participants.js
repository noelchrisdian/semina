import { eventModel as Events } from "../../api/events/model.js";
import { orderModel as Orders } from "../../api/orders/model.js";
import { participantModel as Participants } from "../../api/participants/model.js";
import { BadRequest } from "../../errors/bad request.js";
import { createJWT } from "../../utils/jwt.js";
import { mail } from "../email/mail.js";
import { NotFound } from "../../errors/not found.js";
import { tokenParticipant } from "../../utils/user token.js";
import { Unauthorized } from "../../errors/unauthorized.js";

const registerParticipant = async (req) => {
    const {
        firstName,
        lastName,
        email,
        password,
        role
    } = req.body;

    let participant = await Participants.findOne({
        email,
        status: 'inactive'
    })
    if (participant) {
        participant.firstName = firstName;
        participant.lastName = lastName;
        participant.role = role;
        participant.password = password;
        participant.otp = Math.floor(Math.random() * 9999);
    }

    participant = await Participants.create({
        firstName,
        lastName,
        email,
        password,
        role,
        otp: Math.floor(Math.random() * 9999)
    })

    await mail(email, participant);
    delete participant._doc.password;
    delete participant._doc.otp;
    return participant;
}

const loginParticipant = async (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest(`Please provide email and password`);
    }

    const participant = await Participants.findOne({ email });
    if (!participant) {
        throw new Unauthorized(`Invalid credentials`);
    }

    if (participant.status === 'inactive') {
        throw new Unauthorized(`Your account is not active yet`);
    }

    const passwordCorrect = await participant.comparePassword(password);
    if (!passwordCorrect) {
        throw new Unauthorized(`Invalid credentials`);
    }

    return createJWT({ payload: tokenParticipant(participant) });
}

const activateParticipant = async (req) => {
    const { otp, email } = req.body;
    const participant = await Participants.findOne({ email });

    if (!participant) {
        throw new NotFound('Participant have not registered yet');
    }

    if (participant?.otp !== otp) {
        throw new BadRequest('Incorrect OTP code');
    }

    const result = await Participants.findOneAndUpdate(
        { _id: participant._id },
        { status: 'active' },
        { new: true }
    )
    delete result._doc.password;
    delete result._doc.otp;
    return result;
}

const getEvents = async () => {
    return await Events.find({ statusEvent: 'Published' })
        .populate('category')
        .populate('image')
        .select('_id title date tickets venueName')
}

const getEvent = async (req) => {
    const { id } = req.params;
    const event = await Events.findOne({ _id: id })
    .populate('category')
    .populate('talent')
    .populate('image')
    if (!event) {
        throw new NotFound(`This event doesn't exist`);
    }

    return event;
}

const getOrders = async (req) => {
    console.log(req.participant.id)
    return await Orders.find({ participant: req.participant.id });
}

export {
    activateParticipant,
    getEvents,
    getEvent,
    getOrders,
    loginParticipant,
    registerParticipant
}