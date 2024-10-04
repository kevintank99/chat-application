I developed a real-time chat application that allows users to communicate easily in various chat rooms. Users can join rooms, send messages, and chat with others instantly.

Steps to Run the Application:
Create New Users: Start by creating new user accounts. You need to provide the username and password in the payload.
Create New Rooms: Next, set up new chat rooms. The room_name must be included in the payload and should be unique.

Connection Instructions:
Connect to ws://localhost:3000.

Client-Side Instructions:
Listen for the message event, which the server uses to send messages.
Use the joinRoom event, providing the room_name as payload in the request and including the username in the headers. Note that you won’t be able to join the room if either the username or room name does not exist.
Once connected to the room, you can send messages using the chatMessage event.
