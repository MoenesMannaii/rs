"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function BookingSuccessClient() {
const params = useSearchParams();

  const title = params.get("title") || "Unknown Adventure";
  const date = params.get("date") || "TBD";
  const duration = params.get("duration") || "N/A";
  const name = params.get("name") || "Guest";
  const email = params.get("email") || "No email provided";

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white overflow-hidden px-4">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={300}
        recycle={false}
      />

      <div className="bg-white/90 backdrop-blur-md border border-green-100 shadow-2xl rounded-3xl p-10 md:p-14 text-center max-w-lg w-full animate-fade-in-up">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">Booking Confirmed!</h1>

        <p className="text-gray-700 mb-6 text-md md:text-lg">
          Thank you <span className="font-semibold text-gray-900">{name}</span>, your booking for{" "}
          <span className="font-semibold text-gray-900">{title}</span> is confirmed!
        </p>

        <div className="bg-green-50 rounded-xl shadow-inner p-5 mb-6 text-gray-700 text-left text-sm md:text-base space-y-1">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Duration:</strong> {duration} day(s)</p>
        </div>

        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition hover:scale-105"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
