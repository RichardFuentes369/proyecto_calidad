// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsDate } from "class-validator";

export class FilterOrdenDto {

    @IsString()
    readonly tipo;

    @IsString()
    readonly serial;

}
