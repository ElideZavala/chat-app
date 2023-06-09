import {
    useMultiChatLogic,
    MultiChatSocket,
    MultiChatWindow,
} from "react-chat-engine-advanced";
import { PropTypes } from "prop-types";
import Header from "@/components/customHeader";
import StandartMessageForm from "@/components/customMessageForm/StandartMessageForm";
import Ai from "@/components/customMessageForm/Ai";
import AiCode from "@/components/customMessageForm/AiCode";
import AiAssist from "../customMessageForm/AiAssist";

//? Ver si se puede cumbiar de Idioma.
// import { LocalizationProvider } from "@mui/lab";
// import esLocale from "date-fns/locale/es";

const Chat = ({ user, secret }) => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        user,
        secret
    );

    const styles = {
        container: {
            flexBasis: "100%",
        },
        chatContainer: {
            height: "100vh",
        },
    };

    return (
        <div style={styles.container}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={styles.chatContainer}
                renderChatHeader={(chat) => <Header chat={chat} />}
                renderMessageForm={(props) => {
                    if (chatProps.chat?.title.startsWith("AiChat_")) {
                        return <Ai props={props} activeChat={chatProps.chat} />;
                    }
                    if (chatProps.chat?.title.startsWith("AiCode_text")) {
                        return (
                            <AiCode 
                                props={props} 
                                activeChat={chatProps.chat} 
                            />
                        );
                    }
                    if (chatProps.chat?.title.startsWith("AiAssist_")) {
                        return (
                            <AiAssist
                                props={props}
                                activeChat={chatProps.chat}
                            />
                        );
                    }
                    return (
                        <StandartMessageForm
                            props={props}
                            activeChat={chatProps.chat}
                        />
                    );
                }}
            />
        </div>
    );
};

export default Chat;

Chat.propTypes = {
    user: PropTypes.string,
    secret: PropTypes.string,
};