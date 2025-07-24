import { BadRequest } from '../../errors/bad request.js';
import { userModel as Users } from "../../api/users/model.js";
import { organizerModel as Organizers } from "../../api/organizers/model.js";

const createOrganizer = async (req) => {
    const {
        name,
        email,
        password,
        confirmPassword,
        role,
        organizer
    } = req.body;
    
    if (password !== confirmPassword) {
        throw new BadRequest(`Password confirmation failed`);
    }
    
    const data = await Organizers.create({ organizer });
    const user = await Users.create({
        name, 
        email,
        password,
        role,
        organizer: data._id
    })

    delete user._doc.password;
    return user;
}

export { createOrganizer };