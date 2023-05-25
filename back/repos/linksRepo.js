import Link from '../entities/link.js';

export const getAll = (userId) => {
    return Link.find({
        user: userId
    });
}

export const get = (code) => {
    return Link.findOne({
        code: code
    });
}

export const save = (linkData) => {
    let link = new Link({
        code: linkData.code,
        url: linkData.url,
        user: linkData.userId
    });
    return link.save();
}

export const update = (code, linkData) => {
    return Link.findOneAndUpdate({
        code: code
    }, {
        url: linkData.url
    });
}

export const del = (code) => {
    return Link.findOneAndDelete({
        code: code
    });
}

export const delAll = (userId) => {
    return Link.deleteMany({
        user: userId
    });
}

export const existsByCode = (code) => {
    return Link.exists({
        code: code
    })
}

export const existsByCodeAndUserId = (code, userId) => {
    return Link.exists({
        code: code,
        user: userId
    })
}