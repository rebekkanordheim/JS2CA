// Husk å linke denne modulen til index.html osv
const noroffLoginURL = "https://api.noroff.dev/api/v1/social/auth/login";
const noroffRegisterURL = "https://api.noroff.dev/api/v1/social/auth/register";
const noroffProfileURL = "https://api.noroff.dev/api/v1/social/profiles/";
const noroffPostsURL = "https://api.noroff.dev/api/v1/social/posts/";

async function getWithToken(url) {
    try {
        console.log(url);
        const token = localStorage.getItem('accessToken')
        console.log(token);

        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, fetchOptions);
        console.log(response);

        const json = await response.json();
        console.log(json);

    } catch(error) {
        console.log(error);
    }
}

getWithToken(noroffPostsURL);