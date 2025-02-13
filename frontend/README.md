## Important Chrome Extension Needed :

1) Please use attached CORS Bypass extension as i have used the Swiggy Live API which was giving me a CORS error :-
    "https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en"
2) Add above extension on your chrome browser and turn it on so that it will not throw CORS error 

## Tech Stack :

*   Reactjs
*   ReactDOM
*   Parcel
*   React Hooks
*   JSX
*   Swiggy API
*   React Router Dom
*   Redux

## Dockerizing the App

To run this app using Docker, follow these steps:

1.  **Build the Docker image:**

    ```bash
    docker build -t bite-buddy-frontend .
    ```
2.  **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 bite-buddy-frontend
    ```

    This will start the app and make it accessible at `http://localhost:1234` in your browser.

**Note:** Ensure you have Docker installed on your system before running these commands. Also, create a `Dockerfile` in the root directory of your project with the necessary instructions to build the image.  A basic example `Dockerfile` might look like this:

```dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Remember to adjust the `Dockerfile` according to your project's specific needs.