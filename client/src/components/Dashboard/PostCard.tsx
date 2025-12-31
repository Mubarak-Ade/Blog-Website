import React from "react";

interface Props {
    title: string,
    amount: number,
    icon: React.ReactNode
}

export const PostCard = ({title, amount, icon, }: Props) => {
    return (
        <div className={`space-y-1 py-8 px-4 border bg-white dark:bg-gray-900 rounded-md w-full max-w-3xs`}>
            <div className="bg-black/10 p-2 rounded-md w-fit">
                {icon}
            </div>
            <div className="mt-5 [line-height:24px]">
                <div className="line">
                    <span className="inline mt-2 font-semibold text-gray-500 text-sm">{title}</span>
                    <h4 className="font-bold text-3xl">{amount}</h4>
                </div>
            </div>
        </div>
    );
};
