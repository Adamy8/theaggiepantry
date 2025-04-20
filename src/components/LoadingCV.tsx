import { Skeleton } from "../components/ui/skeleton"


export default function LoadingCVModel() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="relative flex items-center justify-center h-[200px] w-full rounded-3xl">
            <Skeleton className="absolute h-full rounded-3xl" />
            <h1 className="absolute text-s font-bold text-green-500">Loading Computer Vision Model...</h1>
        </div>
    );
}
