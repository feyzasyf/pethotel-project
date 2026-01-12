import {} from "next-auth";

declare module "next-auth" {
  interface User {
    hasAccess: boolean;
  }

  interface Session {
    forceRefresh?: boolean;
    user: User & {
      id: string;
    };
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    userId?: string;
    email: string;
    hasAccess: boolean;
  }
}
