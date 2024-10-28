/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "Users";

	await knex(TABLE_NAME).del();

	const rows = [
		{
			id: "8510a7c1-9281-11ef-a6aa-309c23dfe57e",
			username: "Geoffrey6",
			email: "geoffrey1@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "b3c512e2-f0e4-44a4-bd4a-0b114ad53fc2",
			username: "Greg2",
			email: "geoffrey2@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "90401d4f-8286-4604-bc4f-872714b64691",
			username: "Gilbert3",
			email: "geoffrey3@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "559689f1-8a85-402f-9cbb-773f927f3d7c",
			username: "Gerard9",
			email: "geoffrey4@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "c7f04a3d-ae79-497e-aca6-760f9f17625d",
			username: "Godfrey9",
			email: "geoffrey5@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "ca7a5440-bba2-49a9-8391-8e15b349c603",
			username: "Gabriel9",
			email: "geoffrey6@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "4fd59432-9ca9-4750-a0ae-fa790da19565",
			username: "Joshua1",
			email: "geoffrey7@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "3677e55a-d7c7-4907-8ca0-3ff8933a405c",
			username: "Jarred0",
			email: "geoffrey8@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "146e53d5-970a-4c80-8959-73c246766e8c",
			username: "Jaelene4",
			email: "geoffrey9@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "27df703e-3154-47a1-9205-e03121c241fc",
			username: "John8",
			email: "geoffrey10@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "50bcf67d-4c6d-4ec4-9c37-2a86597c7e1d",
			username: "Jude7",
			email: "geoffrey11@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
	];

	try {
		await knex(TABLE_NAME).insert(rows);
		console.log(TABLE_NAME, rows.length);
	} catch (error) {
		console.error(error);
	}
}
