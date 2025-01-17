import type {CookieData} from "$lib/common";
import type {Actions} from './$types'
import {Activity} from "$lib/Activity";
import {redirect} from "@sveltejs/kit";

export const actions = {
    // create log entry if logged in, no cookie , no user id then no-op
    acceptTerms: async({cookies}) => {
        const cookieData = cookies.get('uni_auth')
        if (cookieData && cookieData.length > 0) {
            const localStore: CookieData = JSON.parse(cookieData)
            if (localStore.id > 0) {
                // log accept terms
                Activity.acceptTerms(localStore.id)
            }
        }
        redirect(302,'/')
    }
} satisfies Actions;