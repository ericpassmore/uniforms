import type { UserInterface } from "$lib/User";
import { getUserFromDb, getDatabase} from "$lib/db";
import type { CookieData } from "$lib/common";

export const load = async ({cookies}) => {
    const uniAuth = cookies.get('uni_auth')
    if (uniAuth && uniAuth.length > 4) {
        const localStore: CookieData = JSON.parse(uniAuth)

        if (localStore.id < 0) {
            return {isAuthenticated: true, users: null}
        }

        const user: UserInterface | undefined = await getUserFromDb<UserInterface>(getDatabase(), localStore.id)
        if (user) {
            return {isAuthenticated: true,
                user: { id: user.id, firstName: user.firstName, lastName: user.lastName, isLeagueOwner: user.isLeagueOwner },
                id: localStore.id
            };
        } else {
            return {isAuthenticated: false, user: null}
        }
    }

}