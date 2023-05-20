import { PropTypes } from "prop-types";

import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
const Header = ({ chat }) => {
    const { title, description } = chat;
    return (
        <div className="chat-header">
            <div className="flexbetween">
                <ChatBubbleLeftRightIcon className="icon-chat" />
                <h3 className="header-text">{title}</h3>
            </div>
            <div className="flexbetween">
                <PhoneIcon className="icon-phone" />
                {description !== "⬅️ ⬅️ ⬅️" ? (
                    <p className="header-text">{description}</p>
                ) : (
                    <p>No chat selected</p>
                )}
            </div>
        </div>
    );
};

export default Header;

Header.propTypes = {
    chat: PropTypes.object,
};
