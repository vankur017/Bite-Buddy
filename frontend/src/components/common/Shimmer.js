import React from 'react';
import Skeleton from 'app/components/common/Skeleton';

const Shimmer = () => {
    return (
        <div className="pt-24 min-h-screen bg-background dark:bg-dark-950 p-8">
            <div className="max-w-screen-xl mx-auto space-y-12">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-1/3 rounded-2xl" />
                    <Skeleton className="h-6 w-1/2 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="glass rounded-[2.5rem] p-6 border-white/20">
                            <Skeleton className="w-full aspect-square rounded-3xl mb-6" />
                            <Skeleton className="h-4 w-1/4 mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-6" />
                            <div className="flex gap-3">
                                <Skeleton className="h-10 flex-1 rounded-xl" />
                                <Skeleton className="h-10 flex-1 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shimmer;
