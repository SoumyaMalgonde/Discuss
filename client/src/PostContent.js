import TimeAgo from "timeago-react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function PostContent(props) {
    return (
        <div>
            <h5 className="text-discuss_text-darker text-sm">Posted by {props.username} <TimeAgo datetime={props.posted_at} /></h5>
            <h2 className="text-xl mb-3">
                {props.title}
            </h2>
            <div className="text-sm leading-6">
                <ReactMarkdown plugins={[remarkGfm]} children={props.body} />

            </div>
        </div>
    );
}

export default PostContent;