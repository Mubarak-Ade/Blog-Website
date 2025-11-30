import { Button } from "../ui/button";

interface Props {
	onClick: () => void;
	Icon: any;
	isActive?: boolean;
	isDisable?: boolean;
}

export const MenuButton = ({ onClick, Icon, isActive, isDisable }: Props) => {
	return (
		<Button
			type="button"
			size="icon-sm"
			className={`p-2 rounded hover:bg-gray-700 transition-colors ${
				isActive ? "bg-gray-700 text-blue-400" : "text-gray-300"
			} ${isDisable ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
			disabled={isDisable}
			onClick={onClick}
			variant={isActive ? "default" : "ghost"}
		>
			<Icon />
		</Button>
	);
};
