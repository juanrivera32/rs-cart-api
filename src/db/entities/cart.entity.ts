import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED'
}

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  updatedAt: Date;
  
  @Column({ type: 'date', nullable: false })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: CartStatus,
    default: CartStatus.OPEN
  })
  status: CartStatus
}