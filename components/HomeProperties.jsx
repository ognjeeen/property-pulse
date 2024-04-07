'use client';

import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import FeaturedProperties from './FeaturedProperties';

const HomeProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${apiDomain}/properties`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.properties);
        }
      } catch (error) {
        console.log(error);
        return [];
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const recentProperties = properties
    ? properties.sort(() => Math.random() - Math.random()).slice(0, 3)
    : [];

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <FeaturedProperties properties={properties} />
          <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto">
              <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                Recent Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentProperties.length === 0 ? (
                  <p>No Properties found</p>
                ) : (
                  recentProperties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))
                )}
              </div>
            </div>
          </section>
          <section className="m-auto max-w-lg my-10 px-6">
            <Link
              href={`/properties`}
              className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            >
              View All Properties
            </Link>
          </section>
        </>
      )}
    </>
  );
};

export default HomeProperties;
