import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/module/postagem.module';
import { Postagem } from './postagem/entity/postagem.entity';
import { Tema } from './tema/entity/tema.entity';
import { TemaModule } from './tema/module/tema.module';
import { TemaService } from './tema/services/tema.service';
import { TemaController } from './tema/controller/tema.controllers';
import { AuthModule } from './auth/module/auth.module';
import { UsuarioModule } from './usuario/module/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'db_blogpessoal',
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
