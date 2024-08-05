import { IsNotEmpty } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  requestId: number;
}