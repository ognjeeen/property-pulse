import connectDB from '@/config/database';
import Property from '@/models/Property';

export const dynamic = 'force-dynamic';

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    // Getting search params (URL) from URL(request.url)
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    // Creating a location patern with RegExp ('i' means case insensitive)
    const locationPatern = new RegExp(location, 'i');

    // Match location patern againts database fields
    let query = {
      $or: [
        { name: locationPatern },
        { description: locationPatern },
        { 'location.street': locationPatern },
        { 'location.city': locationPatern },
        { 'location.state': locationPatern },
        { 'location.zipcode': locationPatern },
      ],
    };

    // Only check for property if it's not 'All'
    if (propertyType && propertyType !== 'All') {
      const typePatern = new RegExp(propertyType, 'i');
      query.type = typePatern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
};
