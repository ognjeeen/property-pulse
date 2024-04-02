import Property from '@/models/Property';
import connectDB from '@/config/database';

// GET /api/featured
export const GET = async (request) => {
  try {
    await connectDB();

    // Searching database to find properties with is_featured: true
    const properties = await Property.find({
      is_featured: true,
    });

    // Returning that whole result object
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
