// app/error.tsx
"use client"; // error boundaries must be Client Components

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="status">
      <p>Something went wrong loading this page.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
