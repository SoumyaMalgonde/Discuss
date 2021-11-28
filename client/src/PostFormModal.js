import { useState, useEffect, useContext } from "react";
import ClickOutHandler from 'react-clickout-handler'
import Textarea from "./Textarea";
import Input from "./Input";
import Button from "./Button";
import PostFormModalContext from "./PostFormModalContext";
import axios from "axios";
import AuthModalContext from "./AuthModelContext";

function PostFormModal() {
    const modalContext = useContext(PostFormModalContext);
    const authModalContext = useContext(AuthModalContext);

    const visibleClass = modalContext.show ? 'block' : 'hidden';
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // create a post
    function createPost() {
        const data = { title, body };
        axios.post('http://localhost:4000/discuss/', data, { withCredentials: true })
            .then(response => {
                modalContext.setShow(false);
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    authModalContext.setShow('login');
                }
                if (error.response.status === 409)
                    alert("Duplicate content. (Either post title or body, please check)");
                if (error.response.status === 500)
                    alert("Internal server error. Please try again.");
            });
    }

    return (
        <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.8)' }}>
            <ClickOutHandler onClickOut={() => { }/*modalContext.setShow(false)*/}>
                <div className="w-3/4 md:w-2/4 border border-discuss_dark-brightest bg-discuss_dark p-5 text-discuss_text self-center mx-auto rounded-md ">
                    <h1 className="text-2xl mb-5">Create a discussion post</h1>
                    <Input
                        className={"w-full mb-3"}
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                        value={title} />
                    <Textarea
                        className={"w-full mb-3"}
                        placeholder="Discussion text (you can use markdown)"
                        onChange={e => setBody(e.target.value)}
                        value={body} />
                    <div className="text-right">
                        <Button onClick={() => modalContext.setShow(false)}
                            outline className={"mr-3 h-8"}  >
                            Cancel
                        </Button>
                        <Button onClick={() => createPost()} className={"h-8"}  >
                            POST
                        </Button>
                    </div>

                </div>
            </ClickOutHandler>
        </div >
    );
}

export default PostFormModal;