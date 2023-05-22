import {
    useMultiChatLogic,
    MultiChatSocket,
    MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandartMessageForm from "@/components/customMessageForm/StandartMessageForm";
import Ai from "@/components/customMessageForm/Ai";

//? Ver si se puede cumbiar de Idioma.
// import { LocalizationProvider } from "@mui/lab";
// import esLocale from "date-fns/locale/es";

const Chat = () => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        "eli",
        "1234"
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
                    if (chatProps.chat?.title.startsWith("AiChat")) {
                        return (
                            <Ai
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
