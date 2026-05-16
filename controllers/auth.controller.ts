import {
  loginService,
  registerService,
  getUserById,
} from "../servises/auth.service";

export async function registerController(req: Request) {
  try {
    const body = await req.json();

    const result = await registerService(body);

    return Response.json(result, {
      status: 201,
    });
  } catch (error: any) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 400,
      },
    );
  }
}

export async function loginController(req: Request) {
  try {
    const body = await req.json();

    const result = await loginService(body);

    return Response.json(result);
  } catch (error: any) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 401,
      },
    );
  }
}

export async function getProfileController(req: Request) {
  try {
    const userId = (req as any).user?.userId;

    const user = await getUserById(userId);

    return Response.json(user);
  } catch (error) {
    return Response.json(
      { message: "Error fetching profile" },
      { status: 500 }
    );
  }
}
