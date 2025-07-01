import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 
              'bg-green-700 hover:bg-green-800 text-white font-medium rounded-md py-2 px-4',
            card: 'bg-neutral-900/80 backdrop-blur-md text-white rounded-lg shadow-lg',
          }
        }}
      />
    </div>
  );
}