
SERVER_URL = "https://blog-api-explorer.onrender.com"

const tabs = document.querySelectorAll('.tabs li');
const tabContents = document.querySelectorAll('.tab-content');

// Add event listener to each tab
tabs.forEach((tab) => {
  tab.addEventListener('click', function handleClick() {
    // Remove active class from all tabs and tab contents
    tabs.forEach((tab) => tab.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));

    // Add active class to clicked tab and its corresponding content
    this.classList.add('active');
    const activeTabContent = document.querySelector(`#${this.dataset.tab}`);
    activeTabContent.classList.add('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {

  // Get elements from the DOM

    const endpoints = document.getElementById("endpoints");
    const requestForm = document.getElementById("request-form");
    const requestTypeSelect = document.getElementById("request-type");
    const requestUrlInput = document.getElementById("request-url");
    const requestDescriptionTextarea = document.getElementById(
      "request-description"
    );
    const requestbody = document.getElementById("endpoint-description");
  
    // Event listener for endpoint clicks
    endpoints.addEventListener("click", function (event) {
      event.preventDefault();
  
      // Check if the clicked element is an anchor tag
      if (event.target.tagName === "A") {
        // Get data attributes from the clicked anchor tag
        const method = event.target.getAttribute("data-method");
        const url = SERVER_URL + event.target.getAttribute("data-url");
        const description = event.target.getAttribute("data-description");
  
        // Set values in the request form
        requestTypeSelect.value = method;
        requestUrlInput.value = url;
        requestDescriptionTextarea.value = description;
      }
    });
  
    // Event listener for the "Run Query" button
    document.getElementById("run-query").addEventListener("click", async function () {
      // Get values from the form
      const method = requestTypeSelect.value;
      const url = requestUrlInput.value;
      const description = requestDescriptionTextarea.value;

       // Reset the response viewer
       document.getElementById("response").innerText = "";

  
      // Perform the API request (you can implement this based on your needs)
      // For demonstration purposes, we'll log the details to the console
      console.log("Method:", method);
      console.log("URL:", url);
      console.log("Description:", description);
      // Perform the API request
      
      try {
        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: method === "POST" ? JSON.stringify(requestbody) : null,
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data)
            document.getElementById("response").innerText = JSON.stringify(
              data,
              null,
              2
            );
          
          });
    } catch (error) {
      // Display the error in the response viewer
      document.getElementById("response").innerText = JSON.stringify(
        error,
        null,
        2
      );
    }
    });
  });
  
