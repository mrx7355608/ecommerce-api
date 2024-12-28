import { Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipeline';
import { SignupDTO, signupSchema } from './auth.validations';

@Controller('auth')
export class AuthController {
    @Post('signup')
    @UsePipes(new ZodValidationPipe(signupSchema))
    async signup(data: SignupDTO) {
        console.log(data);
        return { message: 'hello' };
    }
}
