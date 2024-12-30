import {error, redirect} from "@sveltejs/kit";
import type {CookieData} from "$lib/common";
import {fetchFirst, getDatabase} from "$lib/db";
import {ownershipCheck} from "$lib/ownershipCheck";

const getUniform = async(db: any, jerseyNumber: number) => {
    let results
    try {
        const sql = "SELECT id, jerseyNumber, jerseySize, hasShorts, " +
            "pinnieNumber, pinnieSize, hasPinnie, checkedOutBy, validateInStock "
            + "FROM uniforms WHERE jerseyNumber = ? "
        results = await fetchFirst(db, sql, jerseyNumber);
    } catch(err) {
        console.log(`Error in API selecting uniform ${err}`);
    }
    return results
}

const getState
    = (checkOutBy: number, validateInStock: number): "available" | "checkout" | "reconcile" | "error" => {

    if (checkOutBy <= 0 && validateInStock <= 0) { return "available" }
    if (checkOutBy > 0 && validateInStock <= 0) { return "checkout" }
    if (checkOutBy > 0 && validateInStock > 0) { return "reconcile" }
    return "error" // checked out <= 0 and validateInStock >0

}

const updateUniformState
    = async(db: any, equipmentId: number, checkedOutBy: number, validateInStock: number ) => {

    try {
        const sql = "UPDATE uniforms SET checkedOutBy = ?, validateInStock = ? WHERE id = ?";
        db.run(sql, checkedOutBy, validateInStock, equipmentId);
    } catch(err) {
        console.log(`Error in API updating uniform state ${err}`);
    }
}

const moveToCheckout = async(db:any, equipmentId: number, userId: number) => {
    debugMessage(`moving uni number ${equipmentId} to ${userId}`)
    await updateUniformState(db,equipmentId,userId,0)
}
const moveToReconcile = async(db:any, equipmentId: number, userId: number) => {
    debugMessage(`moving uni num: ${equipmentId} to reconcile by user ${userId}`);
    await updateUniformState(db,equipmentId,userId,1)
}
const moveToAvailable = async(db:any, equipmentId: number) => {
    debugMessage(`moving uni num: ${equipmentId} to available`);
    await updateUniformState(db,equipmentId,0,0)
}

const redirPathToURL = (redir: string | null ) => {
    if (!redir) {
        return null
    }
    if (redir == "home") {
        return '/'
    }
    return `/${redir}/`
}

const debugMessage = (message: string) => {
    console.log(message)
}

export const GET = async ({cookies, url}) => {

    const type = url.searchParams.get('type')
    const jerseyNumber = url.searchParams.get('number')
    const redirectPath = redirPathToURL(url.searchParams.get('redir'))

    if (!type || type !== 'yuni') {
        debugMessage(`Type ${type} not supported`)
        error(400, {message: `Type ${type} not supported`});
    }

    if (type && jerseyNumber) {
        const uniAuth = cookies.get('uni_auth')
        if (uniAuth && uniAuth.length > 4) {
            const localStore: CookieData = JSON.parse(uniAuth)
            const isAuthenticated: boolean = localStore.id > 0
            debugMessage(`Processing cookie, auth status ${isAuthenticated ? `Authenticated` : `Not authenticated`}`);
            if ( !isAuthenticated ) {
                if (redirectPath) {
                    debugMessage('Redirection with non_authorized error')
                    redirect(307, `${redirectPath}?error=not_authorized`)
                }
                debugMessage('Return 403 response with non_authorized error')
                error(403,{message: `Not authorized`});
            }
            const isAdmin = await ownershipCheck(uniAuth)

            const db = getDatabase()
            const uniform = await getUniform(db, Number(jerseyNumber))
            if (!uniform) {
                if (redirectPath) {
                    debugMessage('Redirection with error uniform does not exist')
                    redirect(307, `${redirectPath}?error=uniform_not_found`)
                }
                debugMessage('Return 404 error not found')
                error(404, {message: 'Uniform Not Found'});
            }
            const state = getState(uniform.checkedOutBy, uniform.validateInStock)
            debugMessage(`State for ${jerseyNumber}: ${state}`)
            /****
             **  Process from Available State to Checkout
             */
            if (state === "available") {
                // move to checkout pass in uniformId and userId
                debugMessage(`Move to Checkout with equipId: ${uniform.id} and userId: ${localStore.id}`)
                await moveToCheckout(db, uniform.id, localStore.id)
                if (redirectPath) {
                    debugMessage(`redirect path ${redirectPath}`)
                    redirect(307, redirectPath)
                }
                debugMessage("return response 200 OK")
                return new Response('{"message": "ok"}', {status: 200, statusText: "OK"})
            }
            /****
            **  Process from Checkout State to Reconcile
             */
            if (state === "checkout") {
                debugMessage(`Move to Reconcile with eqipId: ${uniform.id} and userId: ${localStore.id}`)
                // validate current user has ownership to return item
                if (localStore.id === uniform.checkedOutBy) {
                    debugMessage('Validated userId matches checkout')
                    await moveToReconcile(db, uniform.id, uniform.checkedOutBy)
                    if (redirectPath) {
                        debugMessage(`redirect success to ${redirectPath}`)
                        redirect(307, redirectPath)
                    }
                    debugMessage('return response 200 OK')
                    return new Response("ok", {status: 200, statusText: "OK"})
                } else {
                    debugMessage('Ownership on equipment does not match')
                    if (redirectPath) {
                        debugMessage(`redir path ${redirectPath} with Error not_owner`)
                        redirect(307, `${redirectPath}?error=not_owner`)
                    }
                    debugMessage('error 403 not authorized checkout by someone else ')
                    error(403,{message: `Not authorized, checked out by someone else`});
                }
            }
            /****
             **  Process from Reconcile State to Available
             **  Process error state, because if we have the item in hand we should clear status and restock
             */
            if (state === "reconcile" || state === "error") {
                debugMessage(`Move to Available with equipId: ${uniform.id} `)
                if (isAdmin) {
                    await moveToAvailable(db, uniform.id)
                    if (redirectPath) {
                        debugMessage(`redirect success to ${redirectPath}`)
                        redirect(307, redirectPath)
                    }
                    debugMessage('return response 200 OK')
                    return new Response("ok", {status: 200, statusText: "OK"})
                } else {
                    if (redirectPath) {
                        debugMessage(`redirect error ${redirectPath} not admin`)
                        redirect(307, `${redirectPath}?error=not_admin`)
                    }
                    debugMessage('error 403 not authorized not admin')
                    error(403,{message: `Not authorized, require commissioner permissions`});
                }
            }

        } else {
            if (redirectPath) {
                debugMessage(`Redirect with error ${redirectPath} no cookie not authorized`)
                redirect(307, `${redirectPath}?error=not_authorized`)
            }
            debugMessage('error 403 not authorized  no cookie')
            error(403,{message: `Not authorized`});
        }
    } else {
        debugMessage('Not enough params passed ')
        error(400, 'Expected params type, number')
    }
}
