import { Skeleton } from "./ui/skeleton";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
}

export const SkeletonWrapper = ({ children, isLoading, fullWidth }: Props) => {
  if (!isLoading) return children;
  return (
    <Skeleton className={fullWidth ? "w-full" : ""}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};
