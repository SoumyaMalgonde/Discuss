import axios from "axios";
import { useState, useContext } from "react";
import Button from "./Button";
import Textarea from "./Textarea";
import UserContext from "./UserContext";

function CommentForm(props) {
    const userInfo = useContext(UserContext);
    const [commentBody, setCommentBody] = useState('');

    function postComment(e) {
        e.preventDefault();
        const data = { body: commentBody, parent_id: props.parent_id, root_id: props.root_id, };
        axios.post('http://localhost:4000/discuss', data, { withCredentials: true })
            .then(response => {
                console.log(response);
                setCommentBody('');
                if (props.onSubmit) {
                    props.onSubmit();
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 409) {
                    alert("Duplicate content not allowed.");
                }
            });
    }

    return (
        <div className="text-discuss_text">
            {userInfo.username && props.showAuthor && (
                <div>
                    Comment as {userInfo.username}
                </div>
            )}

            <form onSubmit={e => postComment(e)}>
                <Textarea className="w-full mb-3 border border-reddit_border"
                    onChange={e => setCommentBody(e.target.value)}
                    value={commentBody}
                    placeholder={'Your comment. (You can use markdown here)'} />
                <div className="text-right">
                    {!!props.onCancel && (
                        <Button outline
                            className="p-1 mr-2"
                            onClick={e => props.onCancel()}>Cancel</Button>
                    )}
                    <Button className="p-1">Comment</Button>
                </div>
            </form >
        </div >
    )
}

export default CommentForm;