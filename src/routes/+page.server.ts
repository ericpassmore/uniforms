import type { UserInterface } from "$lib/User";
import { fetchFirst, getDatabase} from "$lib/db";
import type { CookieData } from "$lib/common";

export const load = async ({cookies}) => {
    const uniAuth = cookies.get('uni_auth')
    if (uniAuth && uniAuth.length > 4) {
        const localStore: CookieData = JSON.parse(uniAuth)

        if (localStore.id < 0) {
            return {isAuthenticated: true, users: null}
        }

        try {
            const user: UserInterface | undefined = await fetchFirst(
                getDatabase(),
                "SELECT id, firstName, lastName, email, isLeagueOwner FROM users WHERE id = ?",
                localStore.id
            )
            return {isAuthenticated: true, user: user}
        } catch (err) {
            console.log(`Error selecting me ${err}`)
            return {isAuthenticated: false, user: null}
        }
    }

}