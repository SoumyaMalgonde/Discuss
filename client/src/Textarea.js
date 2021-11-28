function Textarea(props) {
    return (
        <textarea {...props} className={"bg-discuss_dark-brighter text-discuss_text p-2 border border-discuss_dark-brightest rounded-md block " + props.className} />
    );
};

export default Textarea;