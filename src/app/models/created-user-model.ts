export class CreatedUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    deliveryAddress: string;
}

export class UserLogin {
    email: string;
    password: string;
}
