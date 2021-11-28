import axios from "axios";
import { useEffect, useState } from "react";
import PostContent from "./PostContent";
import ClickOutHandler from "react-clickout-handler";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Comment from "./Comment";
import RootCommentContext from "./RootCommentContext";

function CommentModal(props) {

    const [comment, setComment] = useState({});

    const visibleClass = props.open ? 'block' : 'hidden';

    useEffect(() => {
        axios.get('http://localhost:4000/discuss/' + props.id)
            .then(response => {
                setComment(response.data[0])
            });
    }, [props.id]);

    function close() {
        setComment({});
        props.onClickOut();
    }

    return (
        <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.8)' }}>
            <ClickOutHandler onClickOut={() => close()}>
                <div className="border border-discuss_dark-brightest w-3/4 lg:w-1/2 p-4 my-4 bg-discuss_dark-brighter text-discuss_text self-center mx-auto rounded-md ">
                    <div className="block overflow-scroll" style={{ maxHeight: "calc(100vh - 20px)" }}>
                        <Comment comment={comment} id={props.id} />

                    </div>
                </div>
            </ClickOutHandler>
        </div>
    );
}

export default CommentModal;