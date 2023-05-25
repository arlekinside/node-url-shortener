import * as UsersRepo from '../repos/usersRepo.js';
import * as LinksService from './linksService.js';

export const getAll = (id) => {
    return UsersRepo.getAll(id);
}

export const get = (id) => {
    return UsersRepo.get(id);
}

export const save = (user) => {
    checkUsername(user.username);

    return UsersRepo.save(user);
}

export const update = (id, user) => {
    return UsersRepo.update(id, user);
}

export const del = async (id) => {
    await LinksService.delAll(id);
    return UsersRepo.del(id);
}

const checkUsername = (username) => {
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(username)) {
        throw new Error('Username have to match [a-zA-Z]');
    }
}