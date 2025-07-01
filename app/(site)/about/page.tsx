import Image from 'next/image';

function About() {
  return (
    <section className="min-h-screen bg-zinc-950  text-white">
      {/* Hero Section */}
      <div className=' max-w-7xl mx-auto pt-24 px-6 md:px-12 flex flex-col gap-24 divide-y divide-zinc-900'>
      <div className="flex flex-col lg:flex-row items-center justify-between ">
        <div className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-12 animate-slide-up py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold leading-tight mb-6">
            <span className="block">About Us</span>
          </h1>
           <p className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed">
            At <span className="text-green-400 font-semibold">Runaway Society</span>, we are a vibrant camping community dedicated to exploring and celebrating the breathtaking landscapes, rich culture, and unique biodiversity of Tunisia. Through responsible and immersive camping experiences, we bring travelers closer to nature, fostering a deep connection with Tunisia’s stunning outdoors.
          </p>
      
        </div>
        <div className="lg:w-1/2 relative animate-slide-up delay-200">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
           <Image
  className="w-full h-auto object-cover"
  src="https://res.cloudinary.com/dnntpvrmp/image/upload/v1749414918/xnqmcnpkq25u7mf0dcri.png"
  alt="nature"
  width={800}   // set a suitable width
  height={500}  // set a suitable height
  priority      // optional, if this is a critical image (like hero)
  quality={90}  // optional, adjust as needed
/>

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
          
        </div>
      </div>

      {/* Our Mission */}
      <div className='space-y-8 divide-y divide-zinc-900'>
      <div className="animate-slide-up delay-100">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Our Mission</h2>
        <p className="text-gray-400 text-lg max-w-4xl mb-4">
          Our mission is to create unforgettable moments under the stars, where adventurers can enjoy authentic local culture, support nearby communities, and actively contribute to preserving the environment for future generations. Whether you’re a seasoned camper or new to outdoor living, Runaway Society offers a welcoming space to discover Tunisia’s natural beauty in a sustainable and meaningful way.
        </p>
      </div>

      {/* Our Vision */}
      <div className="animate-slide-up delay-200">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Our Vision</h2>
        <p className="text-gray-400 text-lg max-w-4xl mb-4">
          we envision a future where camping is more than just a getaway—it’s a way to connect deeply with Tunisia’s natural wonders, culture, and communities. We strive to build a sustainable camping community that inspires travelers to explore responsibly, cherish the environment, and foster meaningful relationships with local people. Our goal is to be a leading force in promoting eco-friendly tourism that preserves Tunisia’s beauty for generations to come.
        </p>
      </div>

      {/* Our Values */}
      <div className="animate-slide-up delay-300">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-400 text-lg space-y-2 max-w-4xl mb-4">
          <li><strong className="text-green-400">Sustainability:</strong> We prioritize eco-friendly practices that minimize our impact on the environment and promote conservation.</li>
          <li><strong className="text-green-400">Authenticity:</strong> We celebrate Tunisia’s rich culture and natural heritage by offering genuine, immersive experiences.</li>
          <li><strong className="text-green-400">Community:</strong> We believe in supporting and empowering local communities through respectful collaboration and fair partnerships.</li>
          <li><strong className="text-green-400">Adventure:</strong> We encourage curiosity and exploration, inviting campers to step outside their comfort zones and discover new horizons.</li>
          <li><strong className="text-green-400">Inclusivity:</strong> Our community welcomes travelers of all backgrounds, fostering a warm, supportive, and diverse environment.</li>
        </ul>
      </div>


      
      {/* Our Founders */}
      <div className="animate-slide-up delay-200">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Founders</h2>
        <p className="text-gray-400 text-lg max-w-4xl mb-4">
         Runaway Society was founded by a passionate group of outdoor enthusiasts and cultural explorers who share a deep love for Tunisia’s landscapes and heritage. With backgrounds in environmental science, tourism, and community development, our founders are committed to creating a camping community that balances adventure with responsibility. Their vision is to inspire travelers to experience Tunisia in a way that is both unforgettable and sustainable.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="animate-slide-up delay-400 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Why Choose <span className="text-green-400">Runaway Society</span></h2>
        <p className="text-gray-400 text-lg max-w-4xl mb-6">
          Choosing <span className="text-green-400">Runaway Society</span> means choosing a travel partner that values authenticity, environmental care, and meaningful connections. Our expert team is deeply rooted in Tunisian culture and committed to making every trip personal, safe, and inspiring.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg text-center group">
            <p className="font-bold">Authentic Camping Experiences</p>
            <p className="text-sm mt-2 text-gray-400">We offer unique camping opportunities that immerse you in Tunisia’s natural beauty and cultural richness.</p>
          </div>
          <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg text-center group">
            <p className="font-bold group-hover:text-green-400">Community-Centered Approach</p>
            <p className="text-sm mt-2 text-gray-400">By choosing Runaway Society, you support local communities and contribute to sustainable development.</p>
          </div>
          <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg text-center group">
            <p className="font-bold group-hover:text-green-400">Expert Guidance</p>
            <p className="text-sm mt-2 text-gray-400"> Our team provides knowledgeable support to ensure safe, enjoyable, and environmentally responsible adventures.</p>
          </div>
          <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg text-center group">
            <p className="font-bold group-hover:text-green-400">Eco-Friendly Practices</p>
            <p className="text-sm mt-2 text-gray-400">We are dedicated to reducing our ecological footprint through sustainable camping methods and education.</p>
          </div>
          <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg text-center group">
            <p className="font-bold group-hover:text-green-400">Welcoming Atmosphere</p>
            <p className="text-sm mt-2 text-gray-400">Whether you’re a solo traveler, family, or group, you’ll find a friendly and inclusive community ready to share the journey.</p>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}

export default About;
