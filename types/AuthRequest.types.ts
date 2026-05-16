type AuthRequest = Request & {
  user?: {
    userId: string;
    role: string;
  };
};