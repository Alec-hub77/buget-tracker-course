import { LoaderIcon } from "lucide-react";

const loading = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <LoaderIcon role="status" aria-label="Loading" className="size-10 animate-spin" />
    </div>
  );
};

export default loading;
