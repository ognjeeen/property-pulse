import { fetchProperties } from '@/utils/request';
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedProperties = async () => {
  // Fetching properties that have showFeatured (is_featured) set to true
  // const properties = await fetchProperties({ showFeatured: true });
  const properties = [];

  return (
    properties.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <FeaturedPropertyCard property={property} key={property._id} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
