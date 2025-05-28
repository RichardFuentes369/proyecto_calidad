import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsString, IsBoolean, IsNumber } from "class-validator";

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly firstName;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly lastName;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly email;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly password;


    @IsBoolean()
    // @Transform(({value}) => value.trim())
    readonly isActive;
}
