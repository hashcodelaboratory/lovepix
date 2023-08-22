import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "../entities/user.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class UserDto extends OmitType(UserEntity, ['id', 'orders']) {
    @ApiProperty({
        description: 'Example of user name',
        example: 'Jozef',
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        description: 'Example of user lastname',
        example: 'Papadžukel',
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description: 'Example of user email',
        example: 'Jozef.Papadzukel@gmail.com',
    })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Example of user password',
        example: 'password123',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Example of user telephone number',
        example: '0908676545',
    })
    @IsNotEmpty()
    phone: string;
}