import { UserModel } from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request){
    try {
        await dbConnect();
        const { email , password } = await request.json();
        const isUserExists = await UserModel.findOne({email});
        if(isUserExists){
            return Response.json({
                message:"User already exists with this email",
                success: false
            }, {
                status:400
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
