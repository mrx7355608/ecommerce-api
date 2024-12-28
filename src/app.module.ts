import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ProductsModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URL),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
