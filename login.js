/**
 * Async function that logs in a user using the provided Noroff API
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * loginUser(noroffLoginURL, userToLogin);
 * ```
 */

const noroffLoginURL = "https://api.noroff.dev/api/v1/social/auth/login";

async function loginUser(url, userData) {
    try {
        console.log(url, userData)

        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData)
        // console.log(response);

        const json = await response.json();
        // console.log(json);

        const accessToken = json.accessToken;
        console.log(json.accessToken);

        localStorage.setItem('accessToken', accessToken);
    } catch(error) {
        console.log(error);
    }
};

const userToLogin = {
    email: 'rebekka_nordheim@noroff.no',
    password: 'secure123',
};

loginUser(noroffLoginURL, userToLogin);