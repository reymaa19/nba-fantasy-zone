"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import GradientBackground from "@/components/ui/background-gradient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

const chartConfig = {
	playerStat: {
		label: "Player Stat",
		color: "hsl(var(--chart-3))",
	},
};

const MAX_STATS = {
	PTS: 34.7,
	AST: 10.9,
	REB: 13.7,
	TOV: 4.04,
	BLK: 3.6,
	STL: 2.0,
	GP: 82,
	FG3M: 4.8,
};

export default function Component({ player, onClick }) {
	const [format, setFormat] = useState("default");
	const [isHovered, setIsHovered] = useState(false);
	const averages = player.stats ? player.stats[player.stats.length - 1] : player;

	const chartData = [
		{ stat: "PTS", value: averages.PTS },
		{ stat: "AST", value: averages.AST },
		{ stat: "REB", value: averages.REB },
		{ stat: "TOV", value: averages.TOV },
		{ stat: "BLK", value: averages.BLK },
		{ stat: "STL", value: averages.STL },
	];

	return (
		<GradientBackground>
			<Card
				className="w-80 cursor-pointer"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<CardHeader className="items-center pb-4">
					<CardTitle>
						#{player.details.jersey} {player.details.full_name}
					</CardTitle>
					<img
						src={player.details.image_path}
						alt={`${player.details.full_name}`}
						className="w-25"
						onClick={() => onClick(player)}
					/>
					<label className="flex gap-4 pt-2">
						{averages.TEAM_ABBREVIATION} {player.details.position}
						<Switch
							className="mt-[4px]"
							id="format-toggle"
							checked={format === "advanced"}
							onCheckedChange={(checked) => setFormat(checked ? "advanced" : "default")}
						/>
					</label>
				</CardHeader>
				<CardContent className="pb-0 min-h-[252px]" onClick={() => onClick(player)}>
					{format === "advanced" ? (
						<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] pb-4">
							<RadarChart data={chartData} outerRadius="80%">
								<PolarGrid />
								<PolarAngleAxis dataKey="stat" />
								<PolarRadiusAxis domain={[0, 34.7]} className="hidden" />
								<Radar
									name="Player Stat"
									dataKey="value"
									stroke="var(--color-playerStat)"
									fill="var(--color-playerStat)"
									fillOpacity={1}
								/>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											indicator="line"
											formatter={(value, _name, props) => {
												const statName = props.payload.stat;
												return `${value} ${statName}`;
											}}
										/>
									}
								/>
							</RadarChart>
						</ChartContainer>
					) : (
						<div className="grid grid-cols-2 gap-2 pb-6 pt-3">
							{Object.entries(MAX_STATS).map(([stat, _]) => (
								<div key={stat} className="text-center flex gap-2 justify-center pb-6">
									<p className="font-semibold">{averages[stat]}</p>
									<p>{stat}</p>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</GradientBackground>
	);
}
