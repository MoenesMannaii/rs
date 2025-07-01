"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/client";
import { useUser } from "@clerk/nextjs";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface Activity {
  name: string;
  description: string;
}

interface ProgramStep {
  day: string;
  description: string;
}

interface GearItem {
  _key: string;
  name: string;
  icon: SanityImageSource;
}

interface AdventureCard {
  slug: { current: string };
  title: string;
  image: SanityImageSource;
  tariff: string;
  description: string;
  activities: Activity[];
  program: ProgramStep[];
  gears: GearItem[];
  gallery: SanityImageSource[];
  video?: { asset: { _ref: string } };
}

function videoUrlFor(source: { asset: { _ref: string } } | undefined): string {
  if (!source) return "/placeholder-video.mp4";
  const assetId = source.asset._ref.replace("file-", "").split("-")[0];
  return `https://cdn.sanity.io/files/2a5peobn/production/${assetId}.mp4`;
}

const AdventuresDetails: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;

  const [adventure, setAdventure] = useState<AdventureCard | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("1");
  const [activeTab, setActiveTab] = useState<"description" | "activities" | "program" | "gears">("description");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { user } = useUser();

  useEffect(() => {
    async function fetchAdventure() {
      if (!slug) {
        setError("No valid slug provided in URL");
        setLoading(false);
        return;
      }

      const query = `*[_type == "adventure" && slug.current == $slug][0] {
        title,
        slug,
        image,
        tariff,
        description,
        activities,
        program,
        gears,
        gallery,
        video
      }`;

      try {
        const data = await client.fetch(query, { slug });
        if (!data) {
          setError(`No adventure found for slug: ${slug}`);
        } else {
          setAdventure(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to fetch adventure: ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAdventure();
  }, [slug]);

  const handleBooking = async () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 8) {
      alert("Please enter a valid phone number");
      return;
    }

    if (!user) {
      alert("You need to be logged in to book.");
      return;
    }

    try {
      const booking = {
        _type: "booking",
        adventureTitle: adventure!.title,
        date: selectedDate,
        duration: selectedDuration,
        phoneNumber,
        userName: user.fullName || user.username || "Unknown User",
        userEmail: user.emailAddresses[0]?.emailAddress || "No Email",
        createdAt: new Date().toISOString(),
      };

      await client.create(booking);

      router.push(
        `/booking-success?title=${encodeURIComponent(adventure!.title)}&date=${encodeURIComponent(
          selectedDate
        )}&duration=${encodeURIComponent(selectedDuration)}&name=${encodeURIComponent(
          user.fullName || "Guest"
        )}&email=${encodeURIComponent(user.emailAddresses[0]?.emailAddress || "")}`
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Booking failed:", err.message);
        alert(`There was an error submitting your booking: ${err.message}`);
      } else {
        console.error("Booking failed:", err);
        alert("There was an unknown error submitting your booking.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-green-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading adventure...</p>
        </div>
      </div>
    );
  }

  if (error || !adventure) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-zinc-950 p-10 rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Adventure Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The adventure you're looking for doesn't exist."}
          </p>
          <Link
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-black min-h-screen font-sans">
      {/* Hero */}
      <div className="relative h-[350px]">
        <Image
          src={urlFor(adventure.image).url()}
          alt={adventure.title}
          fill
          style={{ objectFit: "cover", filter: "brightness(0.75)" }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow">
            {adventure.title}
          </h1>
          <p className="text-xl mt-2">
            Tariff: <span className="text-yellow-400">{adventure.tariff} TND</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Tabs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-950 rounded-xl shadow p-6">
            {/* Tabs */}
            <div className="flex border-b space-x-6">
             {(["description", "activities", "program", "gears"] as const).map((tab) => (
  <button
    key={tab}
    onClick={() => setActiveTab(tab)}
    className={`pb-2 font-medium border-b-2 ${
      activeTab === tab
        ? "border-green-600 text-green-600"
        : "border-transparent hover:text-green-600"
    } transition-all`}
  >
    {tab.charAt(0).toUpperCase() + tab.slice(1)}
  </button>
))}

            </div>

            <div className="mt-8 prose prose-lg max-w-none rounded-lg">
              {activeTab === "description" && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Adventure</h2>
                  <p className="text-white leading-relaxed">{adventure.description}</p>
                </div>
              )}

              {activeTab === "activities" && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Planned Activities</h2>
                  <ul className="space-y-6">
                    {adventure.activities.map((act, i) => (
                      <li key={i}>
                        <p className="text-white leading-relaxed">
                          <strong className="text-green-400">{act.name}</strong>: {act.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "program" && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Our Plan of Action</h2>
                  <ol className="space-y-6">
                    {adventure.program.map((step, i) => (
                      <li key={i}>
                        <p className="text-white leading-relaxed">
                          <strong className="text-green-400">{step.day}</strong>: {step.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {activeTab === "gears" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {adventure.gears.map((gear) => (
                    <div key={gear._key} className="flex items-center space-x-4 p-2 bg-zinc-900 rounded-lg shadow">
                      <Image
                        src={urlFor(gear.icon).width(64).height(64).url()}
                        alt={gear.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                      <span className="font-medium capitalize text-xs sm:text-base text-white">
                        {gear.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-zinc-950 rounded-xl shadow p-6">
            <h2 className="text-xl uppercase text-green-400 font-semibold mb-6">Visual Journey</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {adventure.gallery.map((img, index) => (
                <Image
                  key={index}
                  src={urlFor(img).url()}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Video */}
          <div className="bg-zinc-950 rounded-xl shadow p-4">
            <h3 className="text-xl uppercase text-green-400 font-semibold mb-3">Watch Teaser</h3>
            <div className="aspect-w-9 aspect-h-16">
              <video
                className="rounded-lg w-full h-full"
                src={videoUrlFor(adventure.video)}
                controls
                muted
                loop
                playsInline
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-zinc-950 rounded-xl shadow p-6 sticky top-10">
            <h3 className="text-xl uppercase text-green-400 font-semibold mb-4 text-center">
              Book Your Private Adventure
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Duration</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg appearance-none"
                >
                  <option value="1" className="select-black">1 Day</option>
                  <option value="2" className="select-black">2 Days</option>
                  <option value="3" className="select-black">3 Days</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+216 20 123 456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg placeholder-gray-400"
                />
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdventuresDetails;
