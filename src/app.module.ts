// import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';

// import { DbModule } from './db/db.module';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    // DbModule,
    // JwtModule,
    // AuthModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
