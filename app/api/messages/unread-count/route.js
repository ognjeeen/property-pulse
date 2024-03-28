import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET = async (request) => {
  try {
    await connectDB();

    // Getting a session user
    const sessionUser = await getSessionUser();

    // Checking to see if there is a session and session user
    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', { status: 401 });
    }

    // Getting user id from sessionUser
    const { userId } = sessionUser;

    // Using countDocuments we are getting number of messages that have read as false
    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
