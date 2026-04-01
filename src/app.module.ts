import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entity/postagem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1026',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
    }),
    PostagemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
