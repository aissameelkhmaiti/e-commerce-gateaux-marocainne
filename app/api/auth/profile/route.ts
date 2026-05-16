import { getProfileController } from "../../../../controllers/auth.controller";
import { authMiddleware } from "../../../../middleware/auth.middleware";

export const GET = authMiddleware(getProfileController);