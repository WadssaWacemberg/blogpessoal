import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';
import { PostagemController } from '../controller/postagem.controller';
import { TemaModule } from '../../tema/module/tema.module';
import { UsuarioModule } from '../../usuario/module/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule, UsuarioModule],
  providers: [PostagemService],
  controllers: [PostagemController],
  exports: [TypeOrmModule],
})
export class PostagemModule {}
