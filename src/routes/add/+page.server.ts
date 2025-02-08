import {ownershipCheck} from "$lib/ownershipCheck";
import {error} from "@sveltejs/kit";
import {getDatabase} from "$lib/db";
import fs from "node:fs";
import QRCode from "qrcode";
import {QRCODE_BASE_URI} from '$env/static/private'

const generateQR = async (imagePath: string, text: string) => {
    try {
        console.log(await QRCode.toFile(imagePath, text))
    } catch (err) {
        console.error(err)
    }
}

export const actions = {
    add: async ({request, cookies}) => {
        const formData = await request.formData();
        const jerseyNumber = formData.get("jersey-number")
        const jerseySize = formData.get("jersey-size")
        let hasShorts = formData.get("has-shorts")
        let hasPinnie = formData.get("has-pinnie")
        let pinnieNumber = -1
        let pinnieSize = "youth-small"
        if (hasPinnie > 0) {
            pinnieNumber = formData.get("pinnie-number")
            pinnieSize = formData.get("pinnie-size")
        }

        const isAuthorized = await ownershipCheck(cookies.get('uni_auth'))
        if (!isAuthorized) {
            error(403, {message: 'Not Authorized'});
        } else {
            const sql = "INSERT OR REPLACE INTO uniforms " +
                "(jerseyNumber, jerseySize, hasShorts, pinnieNumber, pinnieSize, hasPinnie) " +
                "VALUES (?, ?, ?, ?, ?, ?)"
            const db = getDatabase()

            const stmt = db.prepare(sql);
            let equipmentId: number

            stmt.run(jerseyNumber,
                jerseySize,
                hasShorts,
                pinnieNumber,
                pinnieSize,
                hasPinnie,
                function (err) {
                    if (err) {
                        error(500, {message: `Error while creating uniform ${(err as Error).message}`})
                    }
                    equipmentId = this.lastID;
                });

            stmt.finalize();

            if (equipmentId == null) {
                console.log(`equipmentId is undefined after db to create uniform`)
            }
            const imagePath = `${fs.realpathSync('.')}/src/lib/qrcodes/equipment-yuni-${equipmentId}-home.png`
            await generateQR(imagePath, `${QRCODE_BASE_URI}?type=yuni&number=${equipmentId}&redir=home`)
        }
    }
}