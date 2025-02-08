import {ownershipCheck} from "$lib/ownershipCheck";
import {error} from "@sveltejs/kit";
import {fetchAll, getDatabase} from "$lib/db";
import fs from "node:fs";
import QRCode from "qrcode";
import {QRCODE_BASE_URI} from '$env/static/private'
import {PUBLIC_QR_IMAGE_PATH} from '$env/static/public'
import type {EquipmentIdInterface} from "$lib/common";

const generateQR = async (imagePath: string, text: string) => {
    try {
        console.log(`Generating QR code from ${imagePath}`);
        await QRCode.toFile(imagePath, text)
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
            const baseImagePath: string = PUBLIC_QR_IMAGE_PATH!=='default' ?
                PUBLIC_QR_IMAGE_PATH : `${fs.realpathSync('.')}/src/lib/qrcodes`
            await generateQR(
                `${baseImagePath}/equipment-yuni-${equipment.id}-home.png`,
                `${QRCODE_BASE_URI}?type=yuni&number=${equipment.id}&redir=home`
            )
        }
    }
}