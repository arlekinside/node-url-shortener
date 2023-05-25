import * as LinksRepo from '../repos/linksRepo.js';

export const getAll = (userId) => {
    return LinksRepo.getAll(userId);
}

export const get = (code) => {
    return LinksRepo.get(code);
}

export const save = async (link) => {
    validateUrl(link.url);

    let code = await generateCode();
    console.log(`New link's generated code=${code}`);
    link.code = code;
    return LinksRepo.save(link);
}

export const update = (code, link) => {
    validateUrl(link.url);

    return LinksRepo.update(code, link);
}

export const del = (code) => {
    return LinksRepo.del(code);
}

export const delAll = (userId) => {
    return LinksRepo.delAll(userId);
}

export const isUserAuthorized = (code, userId) => {
    return LinksRepo.existsByCodeAndUserId(code, userId);
}

const validateUrl = (url) => {
    try {
        new URL(url);
    } catch (err) {
        throw new Error('Url invalid');
    }
}

const generateCode = async () => {
    let code = '';
    do {
        code = Math.random().toString(36).substring(2, 12);
    } while (await LinksRepo.existsByCode(code));
    return code;
}