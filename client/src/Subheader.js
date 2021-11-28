import SubheaderBg from './images/subheaderbg.jpg'

function Subheader() {
    return (
        <div className="h-20 bg cover" style={{ backgroundImage: `url(${SubheaderBg})` }}>
            {/* toDo: button bgs */}
            <div className="pt-8">
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto text-discuss_text bg-discuss_dark-brightest">
                    <li className="nav-item border border-discuss_border rounded-md">
                        <a
                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                            href="#"
                        >
                            <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Discuss</span>
                        </a>
                    </li>
                    <li className="nav-item border border-discuss_border rounded-md">
                        <a
                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                            href="#"
                        >
                            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">ASk me about corner</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>);
};

export default Subheader;
