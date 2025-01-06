import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IUserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ default: process.env.DEFAULT_IMAGE })
    image: string;

    @Prop({ default: 'user', enum: ['user', 'admin'] })
    role: string;

    @Prop({ default: false })
    isVerified: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
