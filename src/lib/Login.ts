import type {TeamSnapItemInterface} from "$lib/TeamSnapInterfaces";
import { getDatabase } from "$lib/db"
import {Activity} from "$lib/Activity";

interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isLeagueOwner: boolean;
}


class Login {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public isLeagueOwner: boolean = false;

    /**
     * Constructs a new User instance.
     * @param data - A JSON object containing user information.
     */
    constructor(data: TeamSnapItemInterface) {

        const userData = this.parse(data);
        this.id = userData.id;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.email = userData.email;
        this.isLeagueOwner = userData.isLeagueOwner;

        const db = getDatabase();
        db.run("INSERT OR REPLACE "
            +" INTO users(id, firstName, lastName, email, isLeagueOwner) "
            +"VALUES (?, ?, ?, ?, ?)",
            this.id,
            this.firstName,
            this.lastName,
            this.email,
            this.isLeagueOwner ? 1 : 0
        )

        Activity.login(this.id)
    }

    /**
     * parses json and returns data
     * @throws throw an error if required fields are missing or have incorrect types.
     * @returns UserInterface
     */
    parse(jsonData: TeamSnapItemInterface): UserInterface {
        let firstName: string | null = null
        let lastName: string | null = null
        let email: string | null = null
        let id: number | null = null
        let isLeagueOwner: boolean = false

        for (const entry of jsonData) {
            for (const item of entry.data) {
                if (item.name === 'id') {
                    id = Number(item.value);
                }
                if (item.name === 'first_name') {
                    firstName = item.value;
                }
                if (item.name === 'last_name') {
                    lastName = item.value;
                }
                if (item.name === 'email') {
                    email = item.value;
                }
                if (item.name === 'highest_role') {
                    if (item.value === 'league_owner') {
                        isLeagueOwner = true;
                    }
                }
            }
        }

        if (!firstName) {
            throw new Error('firstName is required');
        }
        if (!lastName) {
            throw new Error('lastName is required');
        }
        if (!email) {
            throw new Error('email is required');
        }
        if (!id) {
            throw new Error('id is required');
        }

        return {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            isLeagueOwner: isLeagueOwner
        }
    }

    /**
     * Returns the full name of the user.
     * @returns A string combining firstName and lastName.
     */
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * Returns a JSON representation of the user.
     * @returns An object containing user information.
     */
    toJSON(): UserInterface {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            isLeagueOwner: this.isLeagueOwner
        };
    }
}

export default Login;
export type {UserInterface};
