import config from 'config';
import { fetchWrapper } from '@/_helpers';

// const baseUrl = `${config.apiUrl}/users`;
const baseUrl = 'http://localhost:1337/api/products';
const baseUrl2 = 'http://localhost:1337/api/product';

export const productService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl2}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl2, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl2}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
// function _delete(id) {
//     return fetchWrapper.delete(`${baseUrl2}/${id}`);
// }

function _delete(id, params) {
    return fetchWrapper.delete(`${baseUrl2}/${id}`, params);
}
