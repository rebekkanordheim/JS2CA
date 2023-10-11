const API_BASE_URL = 'https://api.noroff.dev';

// Function to create a new post
async function createPost(title, content) {
  try {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage

    // Check if the user is authenticated
    if (!token) {
      console.error('User is not authenticated. Please log in.');
      return;
    }

    const postData = {
      title,
      content,
    };

    // Send a POST request to create a new post
    const response = await fetch(`${API_BASE_URL}/api/v1/social/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      console.log('Post created successfully!');
      // Handle the response or update the UI as needed
    } else {
      console.error('Failed to create a post.');
      // Handle the error or display an error message to the user
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}