import  { PropTypes }  from "prop-types";
import { useState } from "react";
import MessageFormUI from "./MessageFormUI";

const StandartMessageForm = ({ props, activeChat }) => {

    // eslint-disable-next-line react/prop-types
    const { username , onSubmit } = props;

    const [message, setMessage]       = useState("");
    const [attachment, setAttachment] = useState("");

    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = async () => {
        const date = new Date()
            .toISOString()
            .replace("T", " ")
            .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
        const form = {
            attachments: at,
            created: date,  
            sender_username: username,
            text: message,
            activeChatId: activeChat.id,
        };

        onSubmit(form);
        setMessage("");
        setAttachment("");
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            console.log('SELECCIONADO');
            handleSubmit();
        }
    };

    return (
        <MessageFormUI 
            setAttachment={setAttachment}
            message={message}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
        />
    );
};

export default StandartMessageForm;

StandartMessageForm.propTypes  = {
    props: PropTypes.shape({
        username: PropTypes.string,
        onSubmit: PropTypes.func,
    }),
    activeChat: PropTypes.object,
};
