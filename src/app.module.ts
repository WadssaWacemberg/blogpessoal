import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/module/postagem.module';
import { Postagem } from './postagem/entity/postagem.entity';
import { Tema } from './tema/entity/tema.entity';
import { TemaModule } from './tema/module/tema.module';
import { TemaService } from './tema/services/tema.service';
import { TemaController } from './tema/controller/tema.controllers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1026',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema],
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
