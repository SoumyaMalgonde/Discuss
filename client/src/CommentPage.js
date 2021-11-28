import { useParams } from "react-router";
import Comment from "./Comment";

const CommentPage = () => {
    const params = useParams();
    const postId = params.id;

    return (
        <div className="py-4 px-6 bg-discuss_dark">
            <div className="bg-discuss_dark-brighter p-3 rounded-md">
                <Comment id={postId} />
            </div>
        </div>
    );
}

export default CommentPage;