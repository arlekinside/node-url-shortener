import * as UsersService from '../services/userService.js';

export const getAll = async (req, res) => {
    console.log("Running UsersController#getAll");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    try {
        let users = await UsersService.getAll();
        return res.send(users.map(u => {
            return {
                id: u._id,
                username: u.username
            }
        }));
    } catch (err) {
        console.error(`Error finding all users`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}

export const get = async (req, res) => {
    console.log("Running UsersController#get");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    let id = req.params.id;
    if (!id) {
        return res.status(400).send();
    }

    try {
        let user = await UsersService.get(id);
        return res.send({
            id: user._id,
            username: user.username
        });
    } catch (err) {
        console.error(`Error finding user with id=${id}`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}

export const save = async (req, res) => {
    console.log("Running UsersController#save");

    let user = req.body;
    if (!user || !user.username || !user.password) {
        return res.status(400)
            .send({
                message: 'User should contain username and password'
            });
    }

    try {
        let newUser = await UsersService.save(user);
        res.send({
            id: newUser._id,
            username: newUser.username
        });
    } catch (err) {
        console.error(`Error saving user`, err);
        return res.status(400).send({
            message: err.message
        });
    }
}

export const update = async (req, res) => {
    console.log("Running UsersController#update");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    let id = req.params.id;
    let user = req.body;
    if (!id || !user || !user.password) {
        return res.status(400).send();
    }

    if (id != principal._id) {
        return res.status(403).send();
    }

    try {
        await UsersService.update(id, user);
        return res.send({
            id: user._id,
            username: user.username
        });
    } catch (err) {
        console.error(`Error updating user with id=${id}`, err);
        return res.status(400).send({
            message: err.message
        });
    }
}

export const del = async (req, res) => {
    console.log("Running UsersController#del");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    let id = req.params.id;
    if (!id) {
        return res.status(400).send();
    }
    if (id != principal._id) {
        return res.status(403).send();
    }

    try {
        await UsersService.del(id);
        return res.send();
    } catch (err) {
        console.error(`Error deleting user with id=${id}`, err);
        return res.status(400).send({
            message: err.message
        });
    }
}