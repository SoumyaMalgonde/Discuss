import axios from "axios";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Post from "./Post";
import RootCommentContext from "./RootCommentContext";

function Comment(props) {

    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userVotes, setUserVotes] = useState(null);

    function refreshComments() {
        axios.get('http://localhost:4000/discuss/root/' + props.id)
            .then(response => {
                setComments(response.data)
            });
    }

    function refreshVotes() {
        const comment_ids = [comment.comment_id, ...comments.map(c => c.comment_id)];
        axios.post('http://localhost:4000/vote', { comment_ids }, { withCredentials: true })
            .then(response => {
                console.log(comment_ids);
                setCommentsTotals(response.data.commentsTotals);
                setUserVotes(response.data.userVotes);
            })
    }

    useEffect(() => {
        if (props.comment) {
            setComment(props.comment);
        } else {
            axios.get('http://localhost:4000/discuss/' + props.id)
                .then(response => {
                    setComment(response.data[0])
                });
        }
        refreshComments();
        refreshVotes();
    }, [props.id, props.comment]);

    useEffect(() => {
        refreshVotes();
    }, [comments.length]);

    return (
        <>
            {comment && (
                <Post {...comment} open={true} />
            )}
            {!!comment && !!comment.comment_id && (
                <>
                    <hr className="border-reddit_border my-4" />
                    <CommentForm onSubmit={() => refreshComments()}
                        root_id={comment.comment_id} parent_id={comment.comment_id} showAuthor={true} />
                    <hr className="border-reddit_border my-4" />
                    <RootCommentContext.Provider value={{ refreshComments, refreshVotes, commentsTotals, userVotes }}>
                        <Comments
                            parent_id={comment.comment_id}
                            root_id={comment.comment_id}
                            comments={comments} />
                    </RootCommentContext.Provider>

                </>
            )}
        </ >
    );
}

export default Comment;