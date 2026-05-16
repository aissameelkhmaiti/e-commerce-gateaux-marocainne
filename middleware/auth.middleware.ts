import jwt from "jsonwebtoken";

export function authMiddleware(handler: Function) {
  return async (req: Request) => {
    try {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return Response.json({ message: "No token" }, { status: 401 });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      // inject user
      (req as any).user = decoded;

      return handler(req);
    } catch (error) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
  };
}