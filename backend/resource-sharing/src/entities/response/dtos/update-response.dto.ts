import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateResponseDto {
  @IsOptional()
  message?: string;
}