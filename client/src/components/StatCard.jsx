"use client";

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
};

export default function Component({ player, onClick }) {
	const lastSeasonAverages = player.lastSeason[player.lastSeason.length - 1];

	const chartData = Object.entries(MAX_STATS).map(([stat]) => ({
		stat,
		value: lastSeasonAverages[stat],
	}));

	return (
		<GradientBackground>
			<Card className="w-80 cursor-pointer" onClick={() => onClick(player)}>
				<CardHeader className="items-center pb-4">
					<CardTitle>
						#{player.details.jersey} {player.details.full_name}
					</CardTitle>
					<img src={player.details.image_path} alt={`${player.details.full_name}`} className="w-25" />
					<p>
						{lastSeasonAverages.TEAM_ABBREVIATION} {player.details.position}
					</p>
				</CardHeader>
				<CardContent className="pb-0">
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
				</CardContent>
			</Card>
		</GradientBackground>
	);
}
