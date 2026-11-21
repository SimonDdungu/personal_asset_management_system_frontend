import { GENDER } from "@/src/constants/auth/gender";

export interface signupTypes {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    password: string;
    gender: GENDER;
}