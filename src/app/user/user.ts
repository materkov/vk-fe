export class User {
    constructor(public id: number,
                public username: string,
                public can_create_order: boolean,
                public can_execute_order: boolean,
                public balance: string) {

    }
}