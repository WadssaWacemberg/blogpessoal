/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { TemaService } from '../../tema/services/tema.service';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService,
    private usuarioService: UsuarioService,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
      relations: {
        tema: true,
        usuario: true,
      },
    });

    if (!postagem) {
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    }

    return postagem;
  }

  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    if (postagem.tema != null) {
      await this.temaService.findById(postagem.tema.id);
      return await this.postagemRepository.save(postagem);
    } else {
      throw new HttpException('Tema nao pode ser nulo!', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.postagemRepository.delete(id);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    const buscaPostagem: Postagem = await this.findById(postagem.id);

    if (!buscaPostagem || !postagem.id)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    if (postagem.tema) {
      await this.temaService.findById(postagem.tema.id);
      return await this.postagemRepository.save(postagem);
    } else {
      throw new HttpException('Tema nao pode ser nulo!', HttpStatus.NOT_FOUND);
    }
  }
}
