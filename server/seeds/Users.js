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
			username: "123321",
			email: "geoffrey@gmail.com",
			password_hash: "$2b$10$trXluyHg1r55IIqT28VsF.sPVHZ6/WQ7dbROTUhixbzIyW.3enUHq",
		},
		{
			id: "4494a6f0-9284-11ef-a6aa-309c23dfe57e",
			username: "Claude",
			email: "claudia@gmail.com",
			password_hash: "$2b$10$.2jPhOs2PRGk.XUNRKHFc.1tDuOGkKI1xkXWUsxiRl.eGUqBKJHOW",
		},
		{
			id: "4528fca7-7307-4715-8f4c-25397851425c",
			username: "JeePeeTee",
			email: "pilot@gmail.com",
			password_hash: "$2b$10$RDyvyF.k5oOh1LC.8GS5ZuEPBGvwsC/6k/4N8W.QCVddyFQ2RBCIS",
		},
	];

	try {
		await knex(TABLE_NAME).insert(rows);
		console.log(TABLE_NAME, rows.length);
	} catch (error) {
		console.error(error);
	}
}
