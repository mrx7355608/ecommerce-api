import {
    Controller,
    Post,
    Request,
    UsePipes,
    Body,
    UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipeline';
import { SignupDTO, signupSchema } from './auth.validations';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) {
        this.userService = userService;
    }

    @Post('signup')
    @UsePipes(new ZodValidationPipe(signupSchema))
    async signup(@Body() data: SignupDTO) {
        const user = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        };

        const newUser = await this.userService.createUser(user);
        return newUser;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.generateJWT(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        return req.logout();
    }
}
