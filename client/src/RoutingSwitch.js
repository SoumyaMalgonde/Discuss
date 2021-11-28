import { Route, Routes, useLocation } from "react-router";
import Board from "./Board";
import CommentPage from "./CommentPage";
import CommentModal from "./CommentModal";
import { useEffect, useState } from "react";

function RoutingSwitch() {
    const [postOpen, setPostOpen] = useState(false);

    let location = useLocation();
    let commentId = null;
    if (location.state && location.state.commentId) {
        location.pathname = '/';
        if (postOpen) {
            commentId = location.state.commentId;
        } else {
            location.state.commentId = null;
        }
        commentId = (location.state.commentId);
    }
    useEffect(() => {
        setPostOpen(true);
    }, [commentId]);

    useEffect(() => {
        commentId = null;
    }, [postOpen]);

    return (
        <div>
            {commentId && (
                <div>
                    <CommentModal id={commentId} open={postOpen} onClickOut={() => setPostOpen(false)} />
                </div>
            )}

            <Routes location={location}>
                <Route path="/" element={<Board />} />
                <Route path="/discuss/:id" element={<CommentPage />} />
            </Routes>
        </div>

    );
};

export default RoutingSwitch;