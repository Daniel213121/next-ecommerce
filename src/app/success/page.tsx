"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.push("/"); // Redirect to home if no orderId
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          router.push("/orders/" + orderId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [orderId, router]);

  if (!orderId) return null;

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-180px)]">
      <Confetti 
        width={typeof window !== 'undefined' ? window.innerWidth : 1000}
        height={typeof window !== 'undefined' ? window.innerHeight : 1000}
        recycle={false}
        numberOfPieces={500}
      />
      <h1 className="text-6xl text-green-700">Order Successful!</h1>
      <h2 className="text-xl font-medium text-center">
        Thank you for your purchase! We sent the invoice to your email.
      </h2>
      <h3 className="text-gray-600">
        Redirecting to your order in {timeLeft} seconds...
      </h3>
    </div>
  );
};

export default SuccessPage;