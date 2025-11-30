import React from "react";
import { ClipLoader, DotLoader } from "react-spinners";

interface props {
    loading: boolean
}

export const Loader = ({ loading }: props) => {
	return (
		<div className="h-screen w-full flex items-center overflow-hidden justify-center z-999 bg-black/50 absolute top-0 left-0">
			<DotLoader
				color={"var(--color-custom-400)"}
				loading={loading}
				// cssOverride={override}
				size={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			;
		</div>
	);
};
