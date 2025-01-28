import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(Clients).values([
		{ id: 1, name: "Kasim", age: 25, isActive: true },
		{ id: 2, name: "Fernando", age: 35, isActive: true },
		{ id: 3, name: "Esteban", age: 27, isActive: true },
		{ id: 4, name: "Melissa", age: 45, isActive: false },
		{ id: 5, name: "Mario", age: 38, isActive: true },
	  ]);
	// TODO
}
