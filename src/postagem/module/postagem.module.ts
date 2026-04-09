import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from '../entity/postagem.entity';
import { PostagemService } from '../services/postagem.service';
import { PostagemController } from '../controller/postagem.controller';
import { TemaModule } from 'src/tema/module/tema.module';
import { UsuarioModule } from 'src/usuario/module/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule, UsuarioModule],
  providers: [PostagemService],
  controllers: [PostagemController],
  exports: [TypeOrmModule],
})
export class PostagemModule {}
