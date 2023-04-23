import { ApiProperty } from '@nestjs/swagger';
import { CartStatus } from 'src/db/entities/cart.entity';

export class CreateCartDto {
  @ApiProperty()
  userId: string;
  updatedAt?: Date;
  createdAt?: Date;
  status?: CartStatus;
}