// app/(site)/booking-success/page.tsx
import { Suspense } from "react";
import BookingSuccessClient from "@/components/BookingSuccessClient";

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSuccessClient />
    </Suspense>
  );
}
