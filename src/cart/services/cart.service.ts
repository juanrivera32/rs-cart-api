import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import {Carts, CartStatus } from 'src/db/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private readonly userCarts: Repository<Carts>,
  ) {
    console.log('hi from constructor')
  }
  
  async findByUserId(userId: string) {
    return await this.userCarts.findOneBy(
      { userId },
    );
  }

  async createByUserId(userId: string) {
    try {
      const currentDate = new Date();
      const userCart: Carts = {
        userId,
        id: v4(),
        updatedAt: currentDate,
        createdAt: currentDate,
        status: CartStatus.OPEN
      }
      await this.userCarts.insert(userCart)
    } catch(e) {
      return false;
    }
    return true;
  }

  async findOrCreateByUserId(userId: string): Promise<Carts | boolean> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

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
