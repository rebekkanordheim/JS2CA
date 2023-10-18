/**
 * API call that registers the user using the provided Noroff API
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * registerUser(noroffRegisterURL, userToRegister);
 * ```
 */

const noroffRegisterURL = "https://api.noroff.dev/api/v1/social/auth/register";

async function registerUser(url, userData) {
    console.log(url, userData);
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        // console.log(response);

        const json = await response.json();
        // console.log(json);

    } catch (error) {
        console.log(error);
    }
}

const userToRegister = {
    name: 'rebekka_nordheim',
    email: 'rebekka_nordheim@noroff.no',
    password: 'secure123',
};

registerUser(noroffRegisterURL, userToRegister);