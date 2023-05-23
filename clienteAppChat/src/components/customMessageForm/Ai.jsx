import { usePostAiTextMutation } from "@/state/api";
import MessageFormUI from "./MessageFormUI"
import  { PropTypes }  from "prop-types";
import { useState } from "react";

const Ai = ({ props, activeChat}) => {
    
    // eslint-disable-next-line react/prop-types
    const { username , onSubmit } = props;

    const [ message, setMessage]       = useState("");
    const [attachment, setAttachment]  = useState("");
    const [ trigger ] = usePostAiTextMutation();

    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = () => {  
        const date = new Date()
            .toISOString()
            .replace("T","")
            .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment ? [{ blob: attachment, file: attachment.name}] : [];
        const form = {
            attachments: at,
            created: date,
            sender_username: username,
            text: message,
            activeChatId: activeChat.id,
        }

        onSubmit(form);
        trigger(form);
        setMessage("");
        setAttachment("");
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    return (
        <div>
            <MessageFormUI 
            setAttachment={setAttachment}
            message={message}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
        />
        </div>
    )
}

export default Ai

Ai.propTypes = {
    props: PropTypes.shape({
        username: PropTypes.string,
        onSubmit: PropTypes.func,
    }),
    activeChat: PropTypes.object,
}