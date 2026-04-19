import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioController } from '../controller/usuario.controller';
import { UsuarioService } from '../services/usuario.service';
import { AuthModule } from '../../auth/module/auth.module';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
  providers: [UsuarioService, Bcrypt],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
