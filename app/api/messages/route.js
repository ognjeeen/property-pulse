import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();

    // Getting a session user
    const sessionUser = await getSessionUser();

    // Checking to see if there is a session and session user
    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Finding message that matches recipient id
    // Populate that object with sender name and property title
    const readMessages = await Message.find({
      recipient: userId,
      read: true,
    })
      // Sort read messages in asc order
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      // Sort read messages in asc order
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    // Getting data from the contact form using request.json(), data will come from request body
    const { name, email, phone, message, property, recipient } =
      await request.json();

    // Getting a session user
    const sessionUser = await getSessionUser();

    // Checking to see if there is a session and session user
    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: 'You must be logged in to send a message' }),
        { status: 401 }
      );
    }

    // Getting the whole user object from sessionUser (session user and session id )
    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'Can not send a message to yourself' }),
        { status: 400 }
      );
    }

    // Creating a new message object with informations from contact form
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    // Saving newMessage object into database
    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message Sent' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
