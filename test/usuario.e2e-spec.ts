/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { AppModule } from '../src/app.module';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { Postagem } from '../src/postagem/entities/postagem.entity';
import { Tema } from '../src/tema/entities/tema.entity';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let app: INestApplication;
  let usuarioId: any;
  let token: string;

  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TypeOrmModule)
      .useValue(
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Postagem, Tema, Usuario],
          synchronize: true,
          dropSchema: true,
        }),
      )
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('01 - Deve Cadastrar um novo Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar') // aqui e POST .post('/rota')Adicionar ou Criar algo novo
      .send({
        nome: 'Root',
        usuario: 'root2@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201);

    usuarioId = resposta.body.id;
  });

  it('02 - Não Deve Cadastrar um Usuário Duplicado', async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(400);
  });

  it('03 - Deve Autenticar o Usuário (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/auth/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(200);

    token = `Bearer ${resposta.body.token}`;
  });

  it('04 - Deve Listar todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all') // aqui e o GET	.get('/rota')	Listar ou  Ver o que já existe
      .set('Authorization', token)
      .expect(200);
  });

  it('05 - Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar') // aqui e PUT	.put('/rota')
      .set('Authorization', token)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(200)
      .then((resposta) => {
        expect(resposta.body.nome).toEqual('Root Atualizado');
      });
  });
});
