// we need 
import { passwordValidation } from "@/schemas/User.schemas";
import dbConnect from "@/lib/dbConnect";
import * as z from 'zod';

const passwordValidationSchema = z.object({
    password: passwordValidation
})
export async function GET(request: Request){
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const password = searchParams.get('password');

        const parsed = passwordValidationSchema.safeParse({ password }); // Validate the password using zod schema
        // checks each character of the password with the zod schema
        if(!parsed.success) {
            const passwordErrors = parsed.error.format().password?._errors || []; // Extracting error messages from the zod validation if no errors are found just [] 
            return Response.json({

                message:
                passwordErrors?.length > 0
              ? passwordErrors.join(', ')
              : 'Invalid query parameters',
                success: false
            }, {
                status: 400
            });
        }
        // If the password is valid, return success
        return Response.json({
            message: "Password is valid",
            success: true
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            message: "Internal Server Error",
            success: false,
        }, {
            status: 500
        })
    }
}

