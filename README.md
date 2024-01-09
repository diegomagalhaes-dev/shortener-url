# URL Shortener

This project is a simple URL shortener.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- Docker
- Docker Compose

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository:

```bash
git clone https://github.com/diegomagalhaes-dev/shortener-url.git
```

2. Navigate to the project directory:

```bash
cd shortener-url
```

3. Install the dependencies:

```bash
npm install
```

### Running the tests
To run the tests, you can use the following command:

```bash
npm run test
```

### Running the Project with Docker
To run the project with Docker, you can use Docker Compose. Simply run the following command:

```bash
docker-compose up --build
```

This will start the URL shortener service and your dependencies. You can then access the service by navigating to http://localhost:3333 in your web browser.

## API Endpoints

This project provides the following API endpoints:

### User Routes

- `POST /user`: Register a new user.
  - Request body should include `name`, `email`, and `password`.

- `POST /user/sessions`: Start a new session.
  - Request body should include `email` and `password`.

- `GET /user/profile`: Get the user's profile information.
  - Requires authentication.

### URL Shortening Routes

- `POST /shorten`: Shorten a URL.
  - Request body should include `url`.

- `GET /:id`: Retrieve a shortened URL.
  - `id` is the unique identifier for the shortened URL.

### URL Management Routes

- `GET /urls`: List all user URLs.  
    - Requires authentication.

- `DELETE /url`: Delete a URL.
  - Query parameter should include `shorted_url_id`.
  - Requires authentication.

- `GET /url`: Find a URL for the authenticated user.
  - Query parameter should include `shorted_url_id`.
  - Requires authentication.


### Architecture and scale

[Here](https://excalidraw.com/#json=95ISVg5JXiDY7EehkVIKE,aarpI9Bb5Xzxuy-8egDcAw) you can find the architectural drawing along with a scale proposal for the system.

<details>
 <summary>Achitecture Solution</summary>
 
![System Design](/resources/shortener-url-design1x.png)
</details>