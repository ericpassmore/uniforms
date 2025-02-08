import {ownershipCheck} from "$lib/ownershipCheck";
import {error} from "@sveltejs/kit";
import {fetchAll, getDatabase} from "$lib/db";
import fs from "node:fs";
import QRCode from "qrcode";
import {QRCODE_BASE_URI} from '$env/static/private'
import type {EquipmentIdInterface} from "$lib/common";

const generateQR = async (imagePath: string, text: string) => {
    try {
        console.log(await QRCode.toFile(imagePath, text))
    } catch (err) {
        console.error(err)
    }
}

export const actions = {
    regen: async ({request, cookies}) => {

        const db = getDatabase();

        if (!db) {
            console.log("Users database handle null or undefined")
        }
        let uniformsIds: EquipmentIdInterface[]
        try {
            uniformsIds = await fetchAll(db, "SELECT uniforms.id FROM uniforms")
        }  catch (err) {
            console.log(`Error selecting uniforms ${err}`);
        }

        for (const equipment of uniformsIds) {
            const imagePath = `${fs.realpathSync('.')}/src/lib/qrcodes/equipment-yuni-${equipment.id}-home.png`
            await generateQR(imagePath, `${QRCODE_BASE_URI}?type=yuni&number=${equipment.id}&redir=home`)
        }
    }
}