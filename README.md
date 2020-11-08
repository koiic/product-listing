# Stack

A ProductListing Rest API


## features

- [x] Users(Admin) can create product
- [x] Users can view all products
- [x] Users can view a particular product
- [x] Users(Admin) can update product
- [x] Users(Admin) can delete product
- [x] Users can register/login


## API Endpoint

[http://localhost:3000/]



## Getting started

### Technologies Used

- Node JS
- MongoDB
- Docker


### Prerequisites

In order to install and run this project locally, you would need to have the following installed on you local machine.

- [**Node JS**](https://nodejs.org/en/)
- [**MONGODB**](https://www.mongodb.com/download-center)

### Installation

- Clone this repository

```sh
git clone [https://github.com/koiic/product-listing.git]
```

- Navigate to the project directory

* Run `npm install` or `yarn` to instal the projects dependencies
* create a `.env` file and copy the contents of the `.env.example` file into it and supply the values for each variable


## Set Up Development With Docker For Backend Application

1. Download Docker from [here](https://docs.docker.com/)
2. Set up an account to download Docker
3. Install Docker after download
4. Go to your terminal run the command `docker login`
5. Input your Docker email and password

To setup for development with Docker after cloning the repository please do/run the following commands in the order stated below:

-   `cd <project dir>` to check into the dir
-   `docker-compose build`
-   `docker-compose up -d` to start the api after the previous command is successful

The `docker-compose build` command builds the docker image where the api and its mongo database would be situated.
Also this command does the necessary setup that is needed for the API to connect to the database.


- Visit the base endpoint
	```
	http://localhost:3000/
	```



## API Endpoints Summary

- For sample responses check the post man API documentation : 
  <table>
    <tr>
        <th>Request</th>
        <th>End Point</th>
        <th>Action</th>
        <th>Required</th>
    </tr>
      <tr>
        <td>POST</td>
        <td>/api/auth/signup</td>
        <td>Register a User</td>
        <td>name, username, password , age , role</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/login</td>
      <td>Login a user</td>
      <td>username, password</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/products</td>
      <td>create a product</td>
      <td>name, description, price</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/products</td>
      <td>Get all products</td>
      <td></td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/products/:product_id</td>
      <td>Get a single product</td>
      <td>product_id param</td>
    </tr>
   <tr>
      <td>PATCH</td>
      <td>/api/products/:product_id</td>
      <td>Update a single product</td>
      <td>product_id param</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/products/:product_id</td>
      <td>Delete a product</td>
      <td>product_id param, Auth Token(Bearer `token`)</td>
    </tr>
  </table>