import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carts } from "./cart.entity";

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED'
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @OneToMany(() => Carts, carts => carts.id)
  @JoinColumn({ name: 'cartId', referencedColumnName: 'id'})
  cartId: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'integer' })
  count: number;
}