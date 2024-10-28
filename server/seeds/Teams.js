/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "Teams";

	await knex(TABLE_NAME).del();

	const rows = [
		{
			players: [
				"203999",
				"203076",
				"203081",
				"1630163",
				"1641705",
				"202710",
				"1627750",
				"202691",
				"1630581",
				"1630703",
				"1631094",
				"203992",
			],
			user: "ca7a5440-bba2-49a9-8391-8e15b349c603",
		},
		{
			players: [
				"203954",
				"1629027",
				"1627734",
				"204001",
				"1630595",
				"1628969",
				"1627742",
				"1628386",
				"1630578",
				"1629661",
				"1631093",
				"1630559",
			],
			user: "8510a7c1-9281-11ef-a6aa-309c23dfe57e",
		},
		{
			players: [
				"1628983",
				"1628369",
				"202695",
				"202331",
				"203078",
				"1629627",
				"1629028",
				"1630567",
				"1630224",
				"1629012",
				"1630228",
				"1628370",
			],
			user: "b3c512e2-f0e4-44a4-bd4a-0b114ad53fc2",
		},
		{
			players: [
				"1629029",
				"1630162",
				"1628368",
				"1628991",
				"1627783",
				"1629636",
				"1628973",
				"1629639",
				"203497",
				"1627741",
				"1631097",
				"1629628",
			],
			user: "90401d4f-8286-4604-bc4f-872714b64691",
		},
		{
			players: [
				"203507",
				"1628378",
				"1629630",
				"201942",
				"201950",
				"203944",
				"1628384",
				"1628398",
				"203468",
				"1631095",
				"1628381",
				"201566",
			],
			user: "559689f1-8a85-402f-9cbb-773f927f3d7c",
		},
		{
			players: [
				"1630169",
				"1626164",
				"1627759",
				"1628389",
				"1630596",
				"1630178",
				"1630532",
				"1630173",
				"201572",
				"1628401",
				"1628976",
				"203915",
			],
			user: "c7f04a3d-ae79-497e-aca6-760f9f17625d",
		},
		{
			players: [
				"203999", // Nikola Jokic
				"203954", // Joel Embiid
				"1629630", // Ja Morant
				"1627759", // Jaylen Brown
				"1627783", // Pascal Siakam
				"203078", // Bradley Beal
				"1627832", // Fred VanVleet
				"203944", // Julius Randle
				"1630581", // Josh Giddey
				"1630178", // Tyrese Maxey
				"1628384", // OG Anunoby
				"203935", // Marcus Smart
			],
			user: "4fd59432-9ca9-4750-a0ae-fa790da19565", // Joshua1
		},
		{
			players: [
				"1629029", // Luka Doncic
				"2544", // LeBron James
				"1626157", // Karl-Anthony Towns
				"1629027", // Trae Young
				"201935", // James Harden
				"1628973", // Jalen Brunson
				"203468", // C.J. McCollum
				"1629639", // Tyler Herro
				"1628368", // De'Aaron Fox
				"1630567", // Scottie Barnes
				"1629014", // Anfernee Simons
				"1630578", // Alperen Sengun
			],
			user: "3677e55a-d7c7-4907-8ca0-3ff8933a405c", // Jarred0
		},
		{
			players: [
				"203507", // Giannis Antetokounmpo
				"203076", // Anthony Davis
				"1630163", // LaMelo Ball
				"1628389", // Bam Adebayo
				"1627749", // Dejounte Murray
				"1628969", // Mikal Bridges
				"204001", // Kristaps Porzingis
				"1629636", // Darius Garland
				"202699", // Tobias Harris
				"1626179", // Terry Rozier
				"203915", // Spencer Dinwiddie
				"1629011", // Mitchell Robinson
			],
			user: "146e53d5-970a-4c80-8959-73c246766e8c", // Jaelene4
		},
		{
			players: [
				"1628369", // Jayson Tatum
				"203081", // Damian Lillard
				"202695", // Kawhi Leonard
				"202331", // Paul George
				"1627742", // Brandon Ingram
				"1627734", // Domantas Sabonis
				"1626167", // Myles Turner
				"1630217", // Desmond Bane
				"201572", // Brook Lopez
				"1630595", // Cade Cunningham
				"1629008", // Michael Porter Jr.
				"1626156", // D'Angelo Russell
			],
			user: "27df703e-3154-47a1-9205-e03121c241fc", // John8
		},
		{
			players: [
				"201142", // Kevin Durant
				"1628983", // Shai Gilgeous-Alexander
				"202710", // Jimmy Butler
				"1628991", // Jaren Jackson Jr.
				"1628368", // De'Aaron Fox
				"203114", // Khris Middleton
				"202691", // Klay Thompson
				"1630224", // Jalen Green
				"1630532", // Franz Wagner
				"1628386", // Jarrett Allen
				"1630596", // Evan Mobley
				"1628976", // Wendell Carter Jr.
			],
			user: "50bcf67d-4c6d-4ec4-9c37-2a86597c7e1d", // Jude7
		},
	];
	for (const userTeam of rows) {
		await knex("Teams").insert({ user_id: userTeam.user });

		const team = await knex("Teams").where({ user_id: userTeam.user }).first();
		const teamId = team.id;

		const teamPlayers = userTeam.players.map((player_id) => ({
			team_id: teamId,
			player_id,
		}));

		await knex("TeamPlayers").insert(teamPlayers);
	}

	console.log(TABLE_NAME, rows.length);
	console.log("TeamPlayers", rows.length);
}
