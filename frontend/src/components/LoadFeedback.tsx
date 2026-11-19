import { Loader } from 'lucide-react';

interface LoadFeedbackProps {
  status: 'loading' | 'error';
  label: string;
  onRetry: () => void;
}

export default function LoadFeedback({ status, label, onRetry }: LoadFeedbackProps) {
  return (
    <div className="rounded-lg bg-white px-4 py-8 text-center text-gray-600 shadow-sm">
      {status === 'loading' ? (
        <div role="status">
          <Loader aria-hidden="true" className="mx-auto mb-2 h-6 w-6 animate-spin text-blue-800 motion-reduce:animate-none" />
          Loading {label}...
        </div>
      ) : (
        <>
          <p role="alert">Could not load {label}.</p>
          <button type="button" onClick={onRetry} className="mt-2 font-semibold text-blue-800 underline">
            Try again
          </button>
        </>
      )}
    </div>
  );
}
