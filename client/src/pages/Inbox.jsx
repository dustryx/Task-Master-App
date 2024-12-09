import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from "../utils/api";
import '../components/Styles/Inbox.css';


function Inbox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ sender: '', content: '' });

    useEffect(() => {
        axios.get('/messages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    const handleSendMessage = (event) => {
        event.preventDefault();
         api.post('/messages', newMessage)
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage({ sender: '', content: '' });
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMessage({ ...newMessage, [name]: value });
    };

    return (
        <div className="inbox-container">
            <h1>Inbox</h1>
            <div className="messages-container">
    {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
            <div key={message.id} className="message-card">
                <p><strong>{message.sender}</strong></p>
                <p>{message.content}</p>
            </div>
        ))
    ) : (
        <p>No messages yet</p>
    )}
</div>

            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    name="sender"
                    value={newMessage.sender}
                    onChange={handleInputChange}
                    placeholder="Your name"
                />
                <textarea
                    name="content"
                    value={newMessage.content}
                    onChange={handleInputChange}
                    placeholder="Your message"
                />
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Inbox;