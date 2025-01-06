import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ResponseUser } from './dto/respons-user.dto';

interface IUserInput {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private model: Model<User>) {
        this.model = model;
    }

    async createUser(user: IUserInput) {
        const userExists = await this.model.findOne({ email: user.email });
        if (userExists) {
            throw new BadRequestException('Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(user.password, 12);
        user = { ...user, password: hashedPassword };
        const newUser = await this.model.create(user);
        return new ResponseUser(newUser);
    }

    async getByEmail(email: string) {
        const user = await this.model.findOne(
            { email },
            {
                password: 1, // include password for this query
                email: 1,
                firstname: 1,
                lastname: 1,
            },
        );
        return user;
    }
}
