import { Pantry } from "pantry-cloud";
export let pantry;
export function setupPantry() {
    const pantryID = process.env.PANTRY_ID;
    if (!pantryID) {
        throw new Error("No Pantry ID found");
    }
    pantry = new Pantry(pantryID);
    console.log(process.env.PANTRY_ID);
    return;
}
