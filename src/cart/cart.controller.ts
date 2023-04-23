import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Post,
  HttpStatus,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';

import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { CreateCartDto } from './dto/create-cart.dto';
import { Carts } from 'src/db/entities/cart.entity';

@ApiTags('Carts')
@Controller('api/profile/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  async findUserCart(@Param() params) {
    const cart = await this.cartService.findByUserId(params.userId);

    if (!cart) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `There are no carts for user ${params.userId}`,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  @Post()
  async createUserCart(@Body() createCartDto: CreateCartDto) {
    try {
      await this.cartService.createByUserId(createCartDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: {
          message: 'Cart created successfully',
        },
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Put(':userId')
  async updateUserCart(
    @Param() params: AppRequest['params'],
    @Body() body: Omit<Carts, 'userId'>,
  ) {
    // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId({
      userId: params.userId,
      ...body,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Cart updated successfully',
      data: {
        cart,
      },
    };
  }

  @Delete(':userId')
  async clearUserCart(@Param() params: AppRequest['params']) {
    const wasCartDeleted = await this.cartService.removeByUserId(params.userId);
    if (!wasCartDeleted) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong. Please, try again later.',
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Cart deleted successfully',
    };
  }
}
