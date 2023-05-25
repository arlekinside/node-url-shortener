import * as LinksService from '../services/linksService.js';

export const getAll = async (req, res) => {
    console.log("Running LinksController#getAll");
    
    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    try {
        let links = await LinksService.getAll(principal._id);
        if (!links) {
            return res.status(404).send();
        }

        return res.send(links.map(l => {
            return {
                code: l.code,
                url: l.url
            }
        }));
    } catch (err) {
        console.error(`Error finding link with code=${code}`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}

export const get = async (req, res) => {
    console.log("Running LinksController#get");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    let code = req.params.code;
    if (!code) {
        return res.status(400).send();
    }

    try {
        if (!await LinksService.isUserAuthorized(code, principal._id)){
            return res.status(403).send();
        }

        let link = await LinksService.get(code);
        if (!link) {
            return res.status(404).send();
        }

        return res.send({
            code: link.code,
            url: link.url
        });
    } catch (err) {
        console.error(`Error finding link with code=${code}`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}

export const save = async (req, res) => {
    console.log("Running LinksController#save");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    let link = req.body;
    link.userId = principal._id;
    if (!link || !link.url) {
        return res.status(400).send();
    }

    try {
        let newLink = await LinksService.save(link);
        return res.send({
            code: newLink.code,
            url: newLink.url
        });
    } catch (err) {
        console.error(`Error saving link`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}

export const update = async (req, res) => {
    console.log("Running LinksController#update");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    let code = req.params.code;
    let link = req.body;
    link.userId = principal._id;
    if (!code || !link || !link.url) {
        return res.status(400).send();
    }

    try {
        if (!await LinksService.isUserAuthorized(code, principal._id)){
            return res.status(403).send();
        }

        let newLink = await LinksService.update(code, link);
        return res.send({
            code: newLink.code,
            url: newLink.url
        });
    } catch (err) {
        console.error(`Error updating link with code=${code}`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}

export const del = async (req, res) => {
    console.log("Running LinksController#del");

    let principal = req.user;
    if (!principal) {
        return res.status(403).send();
    }

    let code = req.params.code;

    if (!code) {
        return res.status(400).send();
    }

    try {
        if (!await LinksService.isUserAuthorized(code, principal._id)){
            return res.status(403).send();
        }

        await LinksService.del(code);
        return res.send();
    } catch (err) {
        console.error(`Error deleting link with code=${code}`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}

export const redirect = async (req, res) => {
    console.log("Running LinksController#redirect");

    let code = req.params.code;

    if (!code) {
        return res.status(400).send();
    }

    try {
        let link = await LinksService.get(code);
        return res.redirect(link.url);
    } catch (err) {
        console.error(`Error getting link with code=${code}`, err);
        return res.status(404).send({
            message: err.message
        });
    }
}