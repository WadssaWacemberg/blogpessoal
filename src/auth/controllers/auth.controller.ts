import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from '../../auth/entities/usuariologin.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logar')
  login(@Body() user: UsuarioLogin) {
    return this.authService.login(user);
  }
}
