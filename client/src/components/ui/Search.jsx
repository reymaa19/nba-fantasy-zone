import { Input } from "@/components/ui/input";

export default function Search({ value, onChange }) {
	return (
		<div>
			<Input
				type="search"
				placeholder="Search..."
				className="md:w-[100px] lg:w-[300px]"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
