import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRequestDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
