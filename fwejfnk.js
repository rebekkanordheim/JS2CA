console.log("Hello");
const noroffPostsURL = "https://jsonplaceholder.typicode.com/posts";

async function getPosts() {
    try {
        const response = await fetch(noroffPostsURL);
        if (!response.ok) {
            throw new Error("Failed to fetch posts.");
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
    }
}

async function myPosts() {
    try {
        const posts = await getPosts();
        console.log(posts);
        createPostsHTML(posts);
    } catch (error) {
        console.error(error);
    }
}

// Creating HTML for each post called from the provided Noroff API
function createPostsHTML(posts) {
    const container = document.querySelector('.post-feed');

    if (posts.length === 0) {
        // Handle the case when there are no posts
        const noPostsMessage = document.createElement('p');
        noPostsMessage.innerText = 'No posts available.';
        container.appendChild(noPostsMessage);
    } else {
        posts.forEach(post => {
            // Create the post container
            const postContainer = document.createElement('div');
            postContainer.classList.add('feed-item');
            postContainer.id = post.id;

            // Create the post title
            const title = document.createElement('h3');
            title.innerText = post.title.rendered;
            postContainer.appendChild(title);

            // Create the post content
            const content = document.createElement('div');
            content.innerHTML = post.content.rendered;
            postContainer.appendChild(content);

            container.appendChild(postContainer);
        });
    }
}

// Call myPosts to fetch and create HTML when the page loads
myPosts();
