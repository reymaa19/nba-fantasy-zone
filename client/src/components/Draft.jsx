"use client";
import Card from "@/components/custom/DraftCard";
import HeaderNav from "@/components/HeaderNav";
import StatCard from "@/components/StatCard";
import { ModalBody, ModalContent, ModalProvider, ModalTrigger, useModal } from "@/components/ui/animated-modal";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Search from "@/components/ui/Search";
import teamService from "@/services/teamService";
import React from "react";
import { useNavigate } from "react-router-dom";
import playerService from "../services/player";
import statService from "../services/statService";

const Draft = ({ startingFive, setStartingFive }) => {
	const [players, setPlayers] = React.useState([]);
	const [position, setPosition] = React.useState("");
	const [stats, setStats] = React.useState([]);
	const [search, setSearch] = React.useState("");
	const [sort, setSort] = React.useState("PTS");
	const { setOpen } = useModal();
	const playersInStartingFive = [];

	for (const [_key, value] of Object.entries(startingFive)) {
		playersInStartingFive.push(value.details?.id);
	}

	React.useEffect(() => {
		const fetchPlayers = async () => {
			const response = await playerService.getAllPlayers();
			setPlayers(response.data);
		};

		//const fetchLastSeason = async () => {
		//	const response = await statService.getAllLastSeason();
		//	setStats(response.data);
		//};

		const fetchCareer = async () => {
			const response = await statService.getAllCareer();
			setStats(response.data);
		};

		fetchPlayers();
		fetchCareer();
		//fetchLastSeason();
	}, []);

	const handleCardClick = (player) => {
		setStartingFive({ ...startingFive, [position]: player });
		setSearch("");
		setOpen(false);
	};

	const playerDetailsAndStats = players
		.map((player) => ({
			details: player,
			stats: stats?.filter((stat) => stat.PLAYER_ID === player.id),
		}))
		.sort((a, b) => {
			const valueA = a.stats[1]?.[sort] || 0;
			const valueB = b.stats[1]?.[sort] || 0;
			if (valueB > valueA) return 1;
			else return -1;
		});

	return (
		<div className="flex items-center justify-center w-screen pt-16">
			<ModalBody>
				<ModalContent>
					<div className="flex justify-between pb-4">
						<h1 className="w-[318px] ml-10 text-left mt-2">{position}</h1>
						<div className="w-[318px] mr-10">
							<Search value={search} onChange={(e) => setSearch(e.target.value)} />
						</div>
					</div>
					<div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto pr-4">
						<div className="flex flex-row justify-center flex-wrap gap-[1rem] pt-4">
							{playerDetailsAndStats.map((player) => {
								if (
									player.details.position.includes(position.split(" ")[1] || "Center") &&
									player.stats.length > 0
								) {
									if (playersInStartingFive.includes(player.details.id)) return;
									if (
										position === "Small Forward" &&
										(player.details.position.includes("Center") ||
											player.details.position.includes("Guard"))
									)
										return;
									if (position === "Power Forward" && player.details.position.includes("Guard"))
										return;
									if (
										player.details.full_name.toLowerCase().includes(search.toLowerCase()) ||
										player.details.jersey.toString().includes(search)
									)
										return (
											<StatCard
												key={player.details.id}
												player={player}
												onClick={handleCardClick}
											/>
										);
								}
							})}
						</div>
					</div>
				</ModalContent>
			</ModalBody>

			<div className="py-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-8">
				<ModalTrigger className="w-full h-full">
					<Card
						position={startingFive["Small Forward"].details?.full_name || "Small Forward"}
						selected={!!startingFive["Small Forward"].details}
						src={startingFive["Small Forward"].details?.image_path}
						onClick={() => setPosition("Small Forward")}
					>
						<CanvasRevealEffect
							animationSpeed={2}
							containerClassName="bg-rose-600"
							colors={[
								[236, 72, 153],
								[232, 121, 249],
							]}
							dotSize={9}
						/>
						<div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/25 dark:bg-black/25" />
					</Card>
				</ModalTrigger>
				<ModalTrigger className="w-full h-full">
					<Card
						position={startingFive["Shooting Guard"].details?.full_name || "Shooting Guard"}
						selected={!!startingFive["Shooting Guard"].details}
						src={startingFive["Shooting Guard"].details?.image_path}
						onClick={() => setPosition("Shooting Guard")}
					>
						<CanvasRevealEffect animationSpeed={2} containerClassName="bg-emerald-900" dotSize={9} />
					</Card>
				</ModalTrigger>
				<ModalTrigger className="w-full h-full">
					<Card
						position={startingFive["Center"].details?.full_name || "Center"}
						selected={!!startingFive["Center"].details}
						src={startingFive["Center"].details?.image_path}
						onClick={() => setPosition("Center")}
					>
						<CanvasRevealEffect
							animationSpeed={2}
							containerClassName="bg-purple-700"
							colors={[
								[167, 139, 250],
								[196, 181, 253],
							]}
							dotSize={9}
						/>
						<div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black)] bg-purple-700/30" />
					</Card>
				</ModalTrigger>
				<ModalTrigger className="w-full h-full">
					<Card
						position={startingFive["Point Guard"].details?.full_name || "Point Guard"}
						selected={!!startingFive["Point Guard"].details}
						src={startingFive["Point Guard"].details?.image_path}
						onClick={() => setPosition("Point Guard")}
					>
						<CanvasRevealEffect
							animationSpeed={2}
							containerClassName="bg-sky-600"
							colors={[[125, 211, 252]]}
							dotSize={9}
						/>
					</Card>
				</ModalTrigger>
				<ModalTrigger className="w-full h-full">
					<Card
						position={startingFive["Power Forward"].details?.full_name || "Power Forward"}
						selected={!!startingFive["Power Forward"].details}
						src={startingFive["Power Forward"].details?.image_path}
						onClick={() => setPosition("Power Forward")}
					>
						<CanvasRevealEffect
							animationSpeed={2}
							containerClassName="bg-gradient-to-br from-orange-400 to-red-500"
							colors={[[255, 237, 213]]}
							dotSize={9}
						/>
						<div className="absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
					</Card>
				</ModalTrigger>
			</div>
		</div>
	);
};

const DraftWithProvider = () => {
	const navigate = useNavigate();
	const user = JSON.parse(window.localStorage.getItem("user"));
	const [startingFive, setStartingFive] = React.useState({
		"Small Forward": {},
		"Shooting Guard": {},
		Center: {},
		"Point Guard": {},
		"Power Forward": {},
	});

	React.useEffect(() => {
		async function fetchTeam() {
			const response = await teamService.getTeam();
			if (response.data?.length > 0) navigate("/");
		}

		fetchTeam();
	}, []);

	const handleClick = async () => {
		const players = [];
		setTimeout(async () => {
			for (const [_key, value] of Object.entries(startingFive)) {
				players.push(value.details.id);
			}

			const response = await teamService.createTeam({
				players,
				user: JSON.parse(window.localStorage.getItem("user")).id,
			});

			if (response.status === 201) {
				navigate("/");
			}
		}, 1000);
	};

	return (
		<ModalProvider>
			<HeaderNav />
			<Draft startingFive={startingFive} setStartingFive={setStartingFive} />

			{!user ? (
				<div className="w-full flex justify-center">
					<p className="text-lg font-medium tracking-wide text-rose-400">
						You have to be logged in to draft a team
					</p>
				</div>
			) : (
				<div
					className={`flex justify-center ${startingFive["Small Forward"].details && startingFive["Shooting Guard"].details && startingFive["Center"].details && startingFive["Point Guard"].details && startingFive["Power Forward"].details ? "block" : "hidden"}`}
				>
					<BackgroundGradient alwaysHover={false} button={true}>
						<button
							onClick={handleClick}
							className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
						>
							<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
							<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
								Create Team
							</span>
						</button>
					</BackgroundGradient>
				</div>
			)}
		</ModalProvider>
	);
};

export default DraftWithProvider;
