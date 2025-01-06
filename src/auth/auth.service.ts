import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.model';
import { HydratedDocument } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
        this.usersService = usersService;
    }

    async validateUser(email: string, password: string) {
        // 1. check user exists
        const user = await this.usersService.getByEmail(email);
        if (user === null) {
            return null;
        }

        // 2. Match passwords
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid === false) {
            return null;
        }

        return user;
    }

    async generateJWT(
        user: HydratedDocument<User>,
    ): Promise<{ access_token: string }> {
        const payload = { id: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
