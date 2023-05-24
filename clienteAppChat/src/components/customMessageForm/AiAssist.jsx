import { useEffect, useState } from "react";
import  { PropTypes }  from "prop-types";
import { usePostAiAssistMutation } from "@/state/api";
import MessageFormUI from "./MessageFormUI"

function useDebounce(value, delay) {
    const [ debouncedValue, setDebouncedValue ] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

const AiAssist = ({ props, activeChat}) => {
    
    // eslint-disable-next-line react/prop-types
    const { username , onSubmit }         = props;
    const [ message, setMessage]          = useState("");
    const [ attachment, setAttachment ]   = useState("");
    const [ triggerAssist, resultAssist ] = usePostAiAssistMutation();
    const [ appendText, setAppendText ]   = useState("");

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
        setMessage("");
        setAttachment("");
    };

    const debouncedValue = useDebounce(message, 1000);

    useEffect(() => {
        if (debouncedValue) {
            const form = {
                text: message
            }
            triggerAssist(form );
        } 
    }, [debouncedValue]); // eslint-disable-line

    const handleKeyDown = (e) => {
        if (e.keyCode === 9 || e.keyCode === 13) {
            e.preventDefault();
            setMessage(`
                ${message} ${appendText}
            `)
            setAppendText("");
        }
    };

    useEffect(() => {
        if( resultAssist.data?.text ) {
            setAppendText(resultAssist.data.text);
        }
    }, [resultAssist]); // eslint-disable-line


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

export default AiAssist

AiAssist.propTypes = {
    props: PropTypes.shape({
        username: PropTypes.string,
        onSubmit: PropTypes.func,
    }),
    activeChat: PropTypes.object,
}