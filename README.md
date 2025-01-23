# News Hub

This is a React.js news aggregator application that fetches news articles from various sources and presents them in a user-friendly manner. It is designed to be containerized using Docker for easy deployment. Below are the instructions on how to run the project by cloning the repository.

## How to Run the Project with Docker

1. **Install Git if not already installed.**

2. **Clone this repository:**

    ```bash
    git clone https://mohammedanwarabbas@bitbucket.org/anwar-workspace-1/news-hub.git
    ```

3. **Navigate into the project directory:**

    ```bash
    cd news-hub
    ```

4. **Ensure Docker is installed and running.**

5. **Build the Docker Image:**

    ```bash
    docker build -t news-hub . 
    ```

6. **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 news-hub
    ```

7. **Access your application:**

    Open a browser and visit: [http://localhost:3000](http://localhost:3000)

---

## Additional Information

- The app is built using **React.js**, styled with **CSS**, and is mobile-responsive.
- API keys are maintained in the `.env` file. There is no need to create new keys or modify them.
- Ensure Docker is properly installed and running before starting the build process.

---

By following these steps, you can successfully run the News Hub application on your local machine using Docker.
