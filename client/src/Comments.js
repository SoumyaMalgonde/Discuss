import { useState, useContext } from 'react';
import TimeAgo from 'timeago-react';
import Button from './Button';
import CommentForm from './CommentForm';
import RootCommentContext from './RootCommentContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Voting from './Voting';

function Comments(props) {
    const [showForm, setShowForm] = useState(false);

    const comments = props.comments.filter(comment => props.parent_id === comment.parent_id);
    const rootCommentInfo = useContext(RootCommentContext);

    return (
        <div className={'my-2 text-discuss_text'}>
            {comments.map(comment => {
                const replies = props.comments.filter(c => c.parent_id === comment.comment_id);
                return (
                    <div className="mb-2">
                        <div className="flex mb-2">
                            <div className="bg-discuss_text w-10 h-10 rounded-full mr-2" />
                            <div className="leading-10 pr-2 text-lg font-sans"> {comment.username}</div>
                            <TimeAgo className="leading-10 text-md font-sans" datetime={comment.posted_at} />
                        </div>
                        <div className="border-l-2 border-discuss_text-darker px-3 pb-0 " style={{ marginLeft: '18px' }}>
                            <div className="pl-4 -mt-3">
                                <div>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={comment.body} />
                                </div>
                                <Voting comment_id={comment.comment_id} />
                                <Button type={'button'}
                                    onClick={() => setShowForm(comment.comment_id)}
                                    className="bg-discuss_dark-brighter text-discuss_text-darker border-none my-2 pl-0 pr-0">Reply</Button>
                                {comment.comment_id === showForm && (
                                    <CommentForm
                                        parent_id={comment.comment_id}
                                        root_id={props.root_id}
                                        onSubmit={() => {
                                            setShowForm(false);
                                            rootCommentInfo.refreshComments();
                                        }}
                                        showAuthor={false}
                                        onCancel={e => setShowForm(false)} />
                                )}
                                {replies.length > 0 && (
                                    // <div>we have replies here {replies.length}</div>
                                    <Comments comments={props.comments} parent_id={comment.comment_id} root_id={props.root_id} />
                                )}
                            </div>
                        </div>

                    </div>

                )

            })}


        </div>
    );
}

export default Comments;