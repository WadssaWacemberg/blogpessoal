import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostagemModule } from './postagem/module/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/module/tema.module';
import { AuthModule } from './auth/module/auth.module';
import { UsuarioModule } from './usuario/module/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AppController } from 'app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega o .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Necessário para conectar no Aiven
      },
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
