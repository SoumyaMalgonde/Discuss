# Discuss

#### Discuss is a discussion forum, a place to gain and share knowledge. 
#### Demo Link: [Watch demo](https://drive.google.com/file/d/1vKALPN8kSxMRUot9udh7DrAdRumnofZi/view?usp=sharing) 

### Screenshots:
Landing Page <br/>
<img src="supporting docs/screenshots/LandingPage.png" width="800"/>   <br/> <br/>
SignUp View <br/>
<img src="supporting docs/screenshots/SignUp.png" width="800"/>  <br/> <br/>
Create Discussion <br/>
<img src="supporting docs/screenshots/CreateDiscussion.png" width="800"/>  <br/> <br/>
Discussion Views <br/>
<img src="supporting docs/screenshots/DiscussionView1.png" width="800"/>  <br/>
<img src="supporting docs/screenshots/DiscussionView2.png" width="800"/>  <br/>

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
    
    You are all set to run the application!  
    Run server using: `npm start` in server directory.  
    Run client using: `yarn start` in client directory.  
