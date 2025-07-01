import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

function Community() {
  return (
    <section id="community" className="bg-black text-white px-4 ">
      <div className='py-16 md:py-20 max-w-7xl mx-auto'>
      {/* Main Block */}
      <div className="flex flex-col  lg:flex-row items-center justify-between gap-10">
        
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-green-400">
            Community & Eco-Hiking in Tunisia
          </h2>
          <p className="text-gray-300 text-base">
            Across Tunisia, hiking groups are promoting eco-tourism through community-driven adventures focused on nature and sustainability.
          </p>
          <p className="text-gray-300 text-base">
            From Jendouba’s forests to Matmata’s rocky paths, local hikers leave only footprints and take only memories.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li><span className="text-white font-medium">🧹 Clean-Up Hikes:</span> Adventure with impact.</li>
            <li><span className="text-white font-medium">🤝 Local Engagement:</span> Support artisans and guides.</li>
            <li><span className="text-white font-medium">🌱 Sustainability:</span> No plastic, no trace.</li>
            <li><span className="text-white font-medium">📚 Education:</span> Discover rare ecosystems.</li>
          </ul>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-lg">
            
<Image
  src="https://i.postimg.cc/R0rCcXdP/121799979-1227134707661154-2777330340092705372-n.jpg"
  alt="Eco hiking group in Tunisia"
  width={800}
  height={400}
  className="w-full object-cover h-64 md:h-80"
  priority
/>
          </div>
        </div>
      </div>

      {/* Hiking Groups */}
      <div className="mt-16 space-y-10">
        <h3 className="text-2xl md:text-3xl font-bold text-green-400">
          Outdoor Adventure Communities <br />
          <span className="text-white text-lg">Hiking, Camping, Climbing & More</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cards */}
          {[
            {
              name: '🌿 Tunisian Campers',
              desc: 'Camping and hiking adventures across Tunisia for all levels.',
              links: [{ href: 'https://tunisiancampers.com', label: 'tunisiancampers.com' }]
            },
            {
              name: '🏞️ Dar El Ain',
              desc: 'Sustainable tourism in Northwest Tunisia: hiking, camping, diving, local food.',
              links: [
                { href: 'https://darelain.com', label: 'darelain.com' },
                { href: 'https://instagram.com/dar.el.ain', label: '@dar.el.ain' }
              ]
            },
            {
              name: '🧭 Green TREK',
              desc: 'Outdoor group adventures and nature immersion since 2012.',
              links: [
                { href: 'https://green-trek.com', label: 'green-trek.com' },
                { href: 'https://komoot.com', label: 'komoot.com' }
              ],
              extra: 'Contact: +216 24 80 00 60 / hello@green-trek.com'
            },
            {
              name: '🏕️ TuniCamp',
              desc: 'Interactive map of campsites, hiking routes, and natural stays in Tunisia.',
              links: [
                { href: 'https://tunisicamp.org', label: 'tunisicamp.org' },
                { href: 'https://tunisiancampers.com', label: 'tunisiancampers.com' }
              ]
            }
          ].map((group, idx) => (
            <div key={idx} className="bg-zinc-800 p-5 rounded-xl shadow hover:shadow-xl transition">
              <h4 className="text-lg font-semibold text-white mb-1">{group.name}</h4>
              <p className="text-sm text-gray-300 mb-3">{group.desc}</p>
              <div className="space-y-1 text-sm">
                {group.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline block"
                  >
                    {link.label}
                  </Link>
                ))}
                {group.extra && (
                  <p className="text-gray-400">{group.extra}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

export default Community;
