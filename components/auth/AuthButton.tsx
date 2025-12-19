import { Loader2, LucideIcon } from 'lucide-react';

interface AuthButtonProps {
  isSubmitting: boolean;
  icon: LucideIcon;
  text: string;
  loadingText: string;
}

export default function AuthButton({ isSubmitting, icon: Icon, text, loadingText }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <Icon className="h-4 w-4" />
          {text}
        </>
      )}
    </button>
  );
}
