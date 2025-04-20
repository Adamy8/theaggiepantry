import { Skeleton } from "../components/ui/skeleton"


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-col space-y-3 items-center h-screen bg-gray-400 pt-8">
            <Skeleton className="w-4/5 h-4/5 rounded-4xl"/>
        </div>
    );
  }