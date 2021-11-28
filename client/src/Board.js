import PostForm from "./PostForm";
import PostsListing from "./PostsListing";
import Subheader from "./Subheader";

function Board() {
    return (
        <div>
            <Subheader />
            <PostForm />
            <PostsListing />
        </div>
    );
}

export default Board;