import mongoose from 'mongoose';

export interface UserAttrs {
    id: string;
    name: string;
}

export interface UserDoc extends mongoose.Document {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {}
