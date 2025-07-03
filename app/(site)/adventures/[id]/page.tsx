"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/client";
import { liveSanityFetch } from "@/sanity/lib/live";
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
        const data = await liveSanityFetch({ query, params: { slug } });
        if (!data || !data.data) {
          setError(`No adventure found for slug: ${slug}`);
        } else {
          setAdventure(data.data);
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
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold drop-shadow">
            {adventure.title}
          </h1>
          <p className="text-base mt-2">
            Tariff: <span className="text-green-400 font-bold">{adventure.tariff} TND</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Tabs */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-950 rounded-xl shadow p-6">
            <div className="flex border-b space-x-6">
              {["description", "activities", "program", "gears"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`pb-2 text-white text-xs sm:text-base font-medium border-b-2 ${
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
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p>{adventure.description}</p>
                </div>
              )}

              {activeTab === "activities" && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Activities</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {adventure.activities.map((activity, i) => (
                      <li key={i}>
                        <strong>{activity.name}:</strong> {activity.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "program" && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Program</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    {adventure.program.map((step, i) => (
                      <li key={i}>
                        <strong>Day {step.day}:</strong> {step.description}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {activeTab === "gears" && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Gears</h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {adventure.gears.map((gear) => (
                      <li
                        key={gear._key}
                        className="flex flex-col items-center text-center"
                      >
                        <Image
                          src={urlFor(gear.icon).url()}
                          alt={gear.name}
                          width={60}
                          height={60}
                          className="mb-2"
                        />
                        <p className="text-sm">{gear.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-zinc-950 rounded-xl shadow p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {adventure.gallery.map((img, i) => (
                <div key={i} className="relative h-48 rounded overflow-hidden">
                  <Image
                    src={urlFor(img).url()}
                    alt={`${adventure.title} gallery image ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <aside className="bg-zinc-950 rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-6 text-green-400 uppercase tracking-wide">
            Book This Adventure
          </h3>

          <label htmlFor="date" className="block text-white mb-1 text-sm font-semibold">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full rounded px-3 py-2 mb-4 bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-green-600"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />

          <label htmlFor="duration" className="block text-white mb-1 text-sm font-semibold">
            Duration (days)
          </label>
          <select
            id="duration"
            className="w-full rounded px-3 py-2 mb-4 bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-green-600"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={`${i + 1}`}>
                {i + 1}
              </option>
            ))}
          </select>

          <label htmlFor="phone" className="block text-white mb-1 text-sm font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full rounded px-3 py-2 mb-6 bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-green-600"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <button
            onClick={handleBooking}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition"
          >
            Book Now
          </button>
        </aside>
      </div>

      {/* Video Section */}
      {adventure.video && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Adventure Video</h2>
          <video
            controls
            preload="metadata"
            className="w-full max-h-[500px] rounded-lg shadow-lg"
            poster={urlFor(adventure.image).url()}
            src={videoUrlFor(adventure.video)}
          >
            Sorry, your browser doesn&apos;t support embedded videos.
          </video>
        </div>
      )}
    </section>
  );
};

export default AdventuresDetails;
