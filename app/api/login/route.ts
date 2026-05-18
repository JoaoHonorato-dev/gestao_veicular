import { loginUser } from "@/services/user.service";

export async function POST(request: Request) {
  console.log("ROUTE");

  const body = await request.json();

  const result = await loginUser({
    email: body.email,
    password: body.password,
  });

  return Response.json(result);
}