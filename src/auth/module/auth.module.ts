import { forwardRef, Module } from '@nestjs/common';
import { Bcrypt } from './../bcrypt/bcrypt';
import { UsuarioModule } from '../../usuario/module/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './../constants/constants';
import { AuthService } from '../../auth/services/auth.service';
import { AuthController } from '../../auth/controllers/auth.controller';
import { JwtStrategy } from '.././strategy/local.strategy';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [Bcrypt, AuthService, JwtStrategy],
  exports: [Bcrypt],
})
export class AuthModule {}
