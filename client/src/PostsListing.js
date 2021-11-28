import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";


function PostsListing() {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/discuss/', { withCredentials: true })
            .then(response => setComments(response.data));

    }, []);

    return (
        <div className="bg-discuss_dark">
            {comments.map(comment => (
                <Post {...comment} isListing={true} />
            ))}
        </div>
    );
}

export default PostsListing;