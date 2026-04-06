import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a production environment, you would use Resend or another email provider.
    // console.log("New Classification Assessment:", data);
    
    // Simulating email send
    return NextResponse.json({ success: true, message: "Assessment received" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
  }
}
