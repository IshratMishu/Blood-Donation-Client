const Feature = () => {
  const featuredItems = [
    {
      title: "Community Garden Project",
      image: "https://i.ibb.co/NWKcHPd/pexels-cristian-rojas-8460341.jpg",
      description:
        "Our community garden project has transformed vacant lots into beautiful gardens, providing fresh produce to local families.",
      link: "/projects/community-garden",
    },
    {
      title: "School Supplies Drive",
      image: "https://i.ibb.co/RBg7x2B/pexels-karolina-grabowska-4226924.jpg",
      description:
        "Thanks to generous donations, we were able to supply over 500 children with essential school supplies for the new academic year.",
      link: "/projects/school-supplies",
    },
    {
      title: "Homeless Shelter Initiative",
      image: "https://i.ibb.co/vqgrkRY/pexels-mikhail-nilov-7475385.jpg",
      description:
        "Our homeless shelter initiative has provided temporary housing and meals to over 100 individuals in need.",
      link: "/projects/homeless-shelter",
    },
  ];

  return (
    <div className="featured-section bg-base-100 py-10 mt-20 mb-3">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Featured Projects
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {featuredItems.map((item, index) => (
          <div
            key={index}
            className="card w-80 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-red-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4 flex-grow">{item.description}</p>
              <a className="text-blue-500 hover:underline self-start">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
