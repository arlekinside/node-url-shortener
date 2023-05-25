import User from '../entities/user.js';

export const getAll = () => {
    return User.find();
}

export const get = (id) => {
    return User.findById(id);
}

export const save = (userData) => {
    return User.register({
        username: userData.username,
        active: true
    }, userData.password);
}

export const update = async (id, userData) => {
    let user = await get(id);
    return user.setPassword(userData.password);
}

export const del = (id) => {
    return User.findByIdAndDelete(id);
}