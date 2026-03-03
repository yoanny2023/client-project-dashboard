import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// does not need to be imported manually anywhere, just called.
export async function POST(){
 (await cookies()).delete("token");

 return NextResponse.json({
  message: "Logged out"
})
}