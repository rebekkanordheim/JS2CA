async function fetchPostsAndCreateDivs() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  
      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }
  
      const posts = await response.json();
  
      const container = document.querySelector(".postfeed");
  
      posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
  
        const titleElement = document.createElement("h4");
        titleElement.textContent = post.title;
  
        const bodyElement = document.createElement("p");
    bodyElement.textContent = post.body;
  
        postDiv.appendChild(titleElement);
        postDiv.appendChild(bodyElement);
  
        container.appendChild(postDiv);
      });
    } catch (error) {
      console.error(error);
    }
  }
  
fetchPostsAndCreateDivs();