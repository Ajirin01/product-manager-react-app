export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmYjE4MGM0ODZhYzAxMjhjNGI4MDM0YiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYwNTQ2ODY3NX0.iY1PiKN79YYzyBj5ZgnuaEOZbCN2evukFvFore6Fo5I',
            'Content-Type': 'application/json' 
        },
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmYjE4MGM0ODZhYzAxMjhjNGI4MDM0YiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYwNTQ2ODY3NX0.iY1PiKN79YYzyBj5ZgnuaEOZbCN2evukFvFore6Fo5I',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmYjE4MGM0ODZhYzAxMjhjNGI4MDM0YiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYwNTQ2ODY3NX0.iY1PiKN79YYzyBj5ZgnuaEOZbCN2evukFvFore6Fo5I',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

function _delete(url, body) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmYjE4MGM0ODZhYzAxMjhjNGI4MDM0YiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYwNTQ2ODY3NX0.iY1PiKN79YYzyBj5ZgnuaEOZbCN2evukFvFore6Fo5I',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body),

    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}