document.addEventListener("DOMContentLoaded", () => {
  const authMessage = document.getElementById("auth-message");
  const postsContainer = document.getElementById("posts-container");
  const paginationContainer = document.getElementById("pagination");
  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
  const accessToken = localStorage.getItem("accessToken"); // Assuming token is stored here after login

  // Check for access token
  if (!accessToken || !apiKey) {
    authMessage.style.display = "block";
    postsContainer.style.display = "none";
    paginationContainer.style.display = "none";
    return;
  }

  let currentPage = 1;
  const postsPerPage = 10;

  const fetchPosts = async (page = 1) => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/social/posts?_author=true&_comments=true&_reactions=true&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const { data: posts, meta } = await response.json();
      displayPosts(posts);
      displayPagination(meta);
    } catch (error) {
      console.error(error);
      postsContainer.innerHTML = `<p>Error loading posts. Please try again later.</p>`;
    }
  };

  const displayPosts = (posts) => {
    postsContainer.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        ${
          post.media
            ? `<img src="${post.media.url}" alt="${post.media.alt}" class="post-image">`
            : ""
        }
        <p><small>Posted by: ${post.author.name}</small></p>
        <p><small>${post._count.comments} comments, ${
        post._count.reactions
      } reactions</small></p>
      `;
      postsContainer.appendChild(postElement);
    });
    postsContainer.style.display = "block";
  };

  const displayPagination = (meta) => {
    paginationContainer.innerHTML = "";
    if (meta.pageCount > 1) {
      if (meta.previousPage) {
        const prevButton = document.createElement("button");
        prevButton.innerText = "Previous";
        prevButton.className = "btn btn-dark";
        prevButton.addEventListener("click", () => fetchPosts(meta.currentPage - 1));
        paginationContainer.appendChild(prevButton);
      }

      if (meta.nextPage) {
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next";
        nextButton.className = "btn btn-dark";
        nextButton.addEventListener("click", () => fetchPosts(meta.currentPage + 1));
        paginationContainer.appendChild(nextButton);
      }
    }
    paginationContainer.style.display = "block";
  };

  fetchPosts(currentPage);
});