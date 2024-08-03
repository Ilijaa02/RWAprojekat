import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  resourceId: number;
}
