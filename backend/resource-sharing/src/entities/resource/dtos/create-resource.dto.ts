import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ResourceType } from '../resource.entity';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ResourceType)
  type: ResourceType;
}
