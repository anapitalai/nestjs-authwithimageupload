import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/user.dto';
import { UserSchema } from './schema/user.schema';

@Injectable()

export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    async get(){
        return await this.userModel.find();
    }


    async create(user:User,file):Promise<User>{
       
        console.log(file.path,'from create endpoint');
        const username = user.username ;
        const password = user.password;
        console.log(user.password);
        console.log(user.username);
        
        const imgPath = file.path;
        const newPath={image:imgPath};
        console.log(newPath); 
        const newUser= new this.userModel({username:username,password:password,image:imgPath});
        return await newUser.save();
        
    }

    async delete(id:string):Promise<User>{
        return await this.userModel.findByIdAndRemove(id);
    }

    async update(id:string,user:User):Promise<User>{
        return await this.userModel.findByIdAndUpdate(id,user,{new:true});
    }

    async uploadImage(id:string,file):Promise<User>{
        console.log(file.path);
        const imagePath = file.path;
        const {image} = UserSchema;
        return await this.userModel.findByIdAndUpdate(id,{image:imagePath},{new: true});
    }

}
