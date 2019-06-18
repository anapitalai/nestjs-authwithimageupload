import { Controller,Get,Post,Put,Delete,Param,Body, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/user.dto';
import {UserService} from '../users/user.service';
import { async } from 'rxjs/internal/scheduler/async';
import  {User} from '../users/interface/user.interface';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {

    constructor(private userService:UserService ){}

@Get()
async get():Promise<User[]>{
    return this.userService.get();
}

@Get(':id')
async getOne(){
    return;

}

@Post('register')
@UseInterceptors(FileInterceptor('image'))
async create(@Body() createUserDTO:CreateUserDTO,@UploadedFile('file') file):Promise<User>{
    return this.userService.create(createUserDTO,file);
}

@Delete(':id')
async delete(@Param('id') id):Promise<User>{
    return this.userService.delete(id);
}


@Put(':id')
async update(@Param('id') id,@Body() createUserDTO:CreateUserDTO):Promise<User>{
    return this.userService.update(id,createUserDTO);
}

@Put('upload/:id')
@UseInterceptors(FileInterceptor('image'))
uploadImage(@Param('id') id,@UploadedFile('file') file) {
  //console.log(id,file.path);
  return this.userService.uploadImage(id,file);
}

}
