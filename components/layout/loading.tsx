import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};

export { LoadingSpinner };
