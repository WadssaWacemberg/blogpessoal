import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(username);

    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(
      password,
      buscaUsuario.senha,
    );

    if (buscaUsuario && matchPassword) {
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    // 1. Busca o usuário
    const buscaUsuario = await this.usuarioService.findByUsuario(
      usuarioLogin.usuario,
    );

    // 2. Se não existe OU a senha não bate, ERRO
    if (
      !buscaUsuario ||
      !(await this.bcrypt.compararSenhas(
        usuarioLogin.senha,
        buscaUsuario.senha,
      ))
    ) {
      throw new HttpException(
        'Usuário ou senha inválidos.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 3. Se passou, gera o payload e o token
    const payload = { sub: buscaUsuario.usuario };

    return {
      id: buscaUsuario.id,
      nome: buscaUsuario.nome,
      usuario: buscaUsuario.usuario,
      senha: '',
      foto: buscaUsuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
