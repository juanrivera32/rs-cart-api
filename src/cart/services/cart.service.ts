import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import {Carts, CartStatus } from 'src/db/entities/cart.entity';
import { CreateCartDto } from '../dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private readonly userCarts: Repository<Carts>,
  ) {}
  
  async findByUserId(userId: string) {
    return await this.userCarts.findOneBy(
      { userId },
    );
  }

  async createByUserId(createCartDto: CreateCartDto) {
    try {
      const currentDate = new Date();
      const userCart: Carts = {
        userId: createCartDto.userId,
        id: v4(),
        updatedAt: createCartDto.updatedAt || currentDate,
        createdAt: createCartDto.createdAt || currentDate,
        status: createCartDto.status || CartStatus.OPEN
      }
      await this.userCarts.insert(userCart)
    } catch(e) {
      return false;
    }
    return true;
  }

  // async findOrCreateByUserId(userId: string): Promise<Carts | boolean> {
  //   const userCart = await this.findByUserId(userId);

  //   if (userCart) {
  //     return userCart;
  //   }

  //   return this.createByUserId(userId);
  // }

  async updateByUserId({ userId, ...rest }: Carts): Promise<boolean> {
    try {
      const cart = await this.findByUserId(userId)
      this.userCarts.save({userId, ...cart, ...rest});
    } catch(e) {
      return false;
    }
    return true;
  }

  async removeByUserId(userId): Promise<boolean> {
    try {
      const cartToRemove = await this.findByUserId(userId);
      this.userCarts.remove(cartToRemove);
    } catch(e) {
      return false;
    }
    return true;
  }
}
