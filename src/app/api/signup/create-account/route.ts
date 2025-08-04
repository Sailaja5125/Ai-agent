import { UserModel } from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request){
    try {
        await dbConnect();
        const { email , password } = await request.json();
        const isUserExists = await UserModel.findOne({email});
        // if user already exists, return a message with success because I don't want to throw an error
        if(isUserExists){
            return Response.json({
                message:"User already exists with this email",
                success: true
            }, {
                status:200
            })
        }
        const newUser = await UserModel.create({email, password});
        return Response.json({
            message:"User created successfully",
            success: true,
            user:newUser
        },{status:201});
    } catch (error) {
        return Response.json({
            message:"Internal Server Error",
            success: false,
        },{
            status: 500
        });
    }
}
