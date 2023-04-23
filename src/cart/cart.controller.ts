import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { CreateCartDto } from './dto/create-cart.dto';
import { Carts } from 'src/db/entities/cart.entity';

@ApiTags('Carts')
@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) {}

  @Get(':userId')
  async findUserCart(@Param() params) {
    const cart = await this.cartService.findByUserId(params.userId);

    if (!cart) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `There are no carts for user ${params.userId}`
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  @Post()
  async createUserCart(@Body() createCartDto :CreateCartDto) {
    try {
      await this.cartService.createByUserId(createCartDto);
        return {
          statusCode: HttpStatus.OK,
          message: 'OK',
          data: {
            message: 'Cart created successfully'
          },
        };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  
  @Put(':userId')
  async updateUserCart(@Param() params: AppRequest['params'], @Body() body: Omit<Carts, 'userId'>) {
    // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(
      { userId: params.userId, ...body },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Cart updated successfullys',
      data: {
        cart,
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  // @Delete()
  // clearUserCart(@Req() req: AppRequest) {
  //   this.cartService.removeByUserId(getUserIdFromRequest(req));

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //   };
  // }

  // // @UseGuards(JwtAuthGuard)
  // // @UseGuards(BasicAuthGuard)
  // @Post('checkout')
  // checkout(@Req() req: AppRequest, @Body() body) {
  //   const userId = getUserIdFromRequest(req);
  //   const cart = this.cartService.findByUserId(userId);

  //   if (!(cart && cart.items.length)) {
  //     const statusCode = HttpStatus.BAD_REQUEST;
  //     req.statusCode = statusCode;

  //     return {
  //       statusCode,
  //       message: 'Cart is empty',
  //     };
  //   }

  //   const { id: cartId, items } = cart;
  //   const total = calculateCartTotal(cart);
  //   const order = this.orderService.create({
  //     ...body, // TODO: validate and pick only necessary data
  //     userId,
  //     cartId,
  //     items,
  //     total,
  //   });
  //   this.cartService.removeByUserId(userId);

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: { order },
  //   };
  // }
}
