import Avatar from './images/avatar.png';
import { useContext } from 'react';
import PostFormModalContext from './PostFormModalContext';

function PostForm() {

    const modalContext = useContext(PostFormModalContext);

    return (
        <div className="bg-discuss_dark px-6 py-4 text-gray-400">

            <div className="border border-discuss_border p-2 rounded-md flex bg-discuss_dark-brighter">
                <div className="rounded-full w-10 h-10">
                    <img src={Avatar} alt="" />
                </div>
                <form action="" className="flex-grow bg-discuss_dark-brightest border border-discuss_border ml-4 mr-2 rounded-md">
                    <input type="text"
                        onFocus={e => {
                            e.preventDefault();
                            modalContext.setShow(true);
                        }}
                        className="bg-discuss_dark-brightest px-3 text-sm p-2 block w-full rounded-md" placeholder="New Post" />
                </form>
            </div>
        </div>
    );
}

export default PostForm;