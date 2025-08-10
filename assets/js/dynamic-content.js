document.addEventListener("DOMContentLoaded", () => {
  const dynamicSection = document.getElementById("dynamic-content");

  if (dynamicSection) {
    // Example: Fetching dynamic data from an API
    fetch("https://api.example.com/posts")
      .then((response) => response.json())
      .then((data) => {
        let content = "";
        data.forEach((item, index) => {
          content += `
            <article class="post-preview" style="opacity: 0; transform: translateY(20px);" id="post-${index}">
              <h2>${item.title}</h2>
              <p>${item.description}</p>
              <a href="${item.url}" target="_blank">Read more</a>
            </article>
          `;
        });
        dynamicSection.innerHTML = content;

        // Add fade-in animation
        const posts = document.querySelectorAll(".post-preview");
        posts.forEach((post, index) => {
          setTimeout(() => {
            post.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            post.style.opacity = "1";
            post.style.transform = "translateY(0)";
          }, index * 200); // Staggered animation
        });
      })
      .catch((error) => {
        console.error("Error fetching dynamic content:", error);
        dynamicSection.innerHTML = "<p>Failed to load content.</p>";
      });
  }

  // Add hover effect for dynamic content
  dynamicSection.addEventListener("mouseover", (event) => {
    if (event.target.closest(".post-preview")) {
      const post = event.target.closest(".post-preview");
      post.style.transform = "scale(1.05)";
      post.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    }
  });

  dynamicSection.addEventListener("mouseout", (event) => {
    if (event.target.closest(".post-preview")) {
      const post = event.target.closest(".post-preview");
      post.style.transform = "scale(1)";
      post.style.boxShadow = "none";
    }
  });
});