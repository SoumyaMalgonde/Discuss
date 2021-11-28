# Discuss

#### Discuss is a discussion forum, a place to gain and share knowledge. 

### Screenshots: 

### Working Features: 

- Create discussion post. 
- View all discussion posts. 
- Comment on main discussion posts. 
- Multilevel commenting. 
- Upvote/downvote any comment. 

### Tech Stack: 

- Backend: NodeJs, MySQL 
- Frontend: ReactJs 

### Installation 

1.  Install the requirements: Node.js, yarn, npm, mySql. 
2.  Clone the repository. 
    `git clone https://github.com/SoumyaMalgonde/Discuss.git` 
3.  Setup databse using the dump file: 
    a. Open mysql and create an empty database to be used for extracting dump file. 
    b. `mysql -p -u [user] [database] < discuss_dump.sql` (add your credentials and database name)  
4.  Navigate into `Client` directory: 
    a. `cd Client`  
    b. Install the dependencies.  
    `yarn install`  
5.  Navigate into `Server` directory:   
    a. add .env file 
    ```sh 
    # DATABASE CONNECTION ENVIRONMENT VARIABLES
    DB_HOST=localhost
    DB_USER=[user]
    DB_DATABASE=[database]
    DB_PASSWORD=[password]
    # jwt
    SECRET="[add your secret here]"
    ```
    b. Install the dependencies.
    `npm install`
    
    Yayy! you are all set to run the application!  
    Run server using: `npm start` in server directory.  
    Run client using: `yarn start` in client directory.  
