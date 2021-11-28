import { Link } from 'react-router-dom';
import PostContent from './PostContent';

function Post(props) {
    let postClasses = "block rounded-md " + (props.open ? "" : "hover:border-discuss_text ");
    if (props.isListing) {
        postClasses += " bg-discuss_dark-brighter p-3 mx-6 border border-discuss_border";
    } else {
        postClasses += " border-none";
    }
    return (
        <div>
            <div className=" text-discuss_text pb-4">
                {props.open && (
                    <div className={postClasses}>
                        <PostContent {...props} />
                    </div>
                )}
                {!props.open && (
                    <Link to={'/discuss/' + props.comment_id}
                        className={postClasses}
                        state={{ commentId: props.comment_id }} >
                        <PostContent {...props} />
                    </Link>
                )}

            </div>
        </div >
    );
}

export default Post;