import React from "react";

const NBAFantasyZoneLogo = () => {
	return (
		<svg
			height="64"
			width="64"
			viewBox="0 0 400 400"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					id="orangeGradient"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%"
				>
					<stop offset="0%" stopColor="#FF4500" />
					<stop offset="100%" stopColor="#FFA500" />
				</linearGradient>
				<linearGradient
					id="blueGradient"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%"
				>
					<stop offset="0%" stopColor="#000080" />
					<stop offset="100%" stopColor="#4169E1" />
				</linearGradient>
				<filter id="glow">
					<feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* Abstract basketball shape */}
			<path
				d="M200,100 Q300,150 250,250 T200,400 Q100,350 150,250 T200,100"
				fill="url(#orangeGradient)"
				opacity="0.8"
			/>

			{/* Dynamic arcs representing motion and fantasy */}
			{[...Array(5)].map((_, i) => (
				<path
					key={i}
					d={`M${100 + i * 50},400 Q200,${300 - i * 60} ${300 + i * 20},400`}
					fill="none"
					stroke="url(#blueGradient)"
					strokeWidth={6 - i}
					opacity={0.7 - i * 0.1}
				>
					<animate
						attributeName="d"
						values={`M${100 + i * 50},400 Q200,${300 - i * 60} ${300 + i * 20},400;
                     M${100 + i * 50},400 Q200,${250 - i * 60} ${300 + i * 20},400;
                     M${100 + i * 50},400 Q200,${300 - i * 60} ${300 + i * 20},400`}
						dur="5s"
						repeatCount="indefinite"
					/>
				</path>
			))}

			{/* Stylized basketball lines */}
			<path
				d="M150,200 C200,100 300,150 250,250 S150,300 150,200"
				fill="none"
				stroke="#FFF"
				strokeWidth="3"
				opacity="0.6"
			/>
			<path
				d="M250,200 C200,100 100,150 150,250 S250,300 250,200"
				fill="none"
				stroke="#FFF"
				strokeWidth="3"
				opacity="0.6"
			/>

			{/* Abstract star shapes */}
			{[...Array(3)].map((_, i) => (
				<path
					key={i}
					d={`M${200 + i * 30},${150 - i * 20} l20,40 l-40,-15 l40,15 l-20,40 l20,-40 l40,15 l-40,-15 l20,-40 l-20,40 z`}
					fill="#FFD700"
					opacity={0.7 - i * 0.2}
					transform={`rotate(${i * 30} 200 200)`}
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						from={`${i * 30} 200 200`}
						to={`${360 + i * 30} 200 200`}
						dur="20s"
						repeatCount="indefinite"
					/>
				</path>
			))}

			{/* Typography */}
			{/* <text x="200" y="80" fontFamily="Arial Black, sans-serif" fontSize="48" fontWeight="bold" textAnchor="middle" fill="#FFF" filter="url(#glow)">NBA</text> */}
			{/* <text x="200" y="360" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" textAnchor="middle" fill="#FFF" filter="url(#glow)">
        <tspan fill="url(#orangeGradient)">FANTASY</tspan>
        <tspan dx="10" fill="url(#blueGradient)">ZONE</tspan>
      </text> */}

			{/* Floating particles */}
			{[...Array(20)].map((_, i) => (
				<circle
					key={i}
					r={Math.random() * 3 + 1}
					fill="#FFF"
					opacity={Math.random() * 0.5 + 0.3}
				>
					<animate
						attributeName="cx"
						values={`${Math.random() * 400};${Math.random() * 400}`}
						dur={`${Math.random() * 10 + 10}s`}
						repeatCount="indefinite"
					/>
					<animate
						attributeName="cy"
						values={`${Math.random() * 400};${Math.random() * 400}`}
						dur={`${Math.random() * 10 + 10}s`}
						repeatCount="indefinite"
					/>
				</circle>
			))}
		</svg>
	);
};

export default NBAFantasyZoneLogo;

