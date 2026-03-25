declare global {
  namespace App {
    interface Locals {
      auth: () => Promise<{
        user: {
          id: string;
          email: string;
          name: string;
          role?: string | null;
          emailVerified: boolean;
          createdAt: Date;
          updatedAt: Date;
          image?: string | null;
        };
        session: {
          id: string;
          userId: string;
          token: string;
          expiresAt: Date;
          createdAt: Date;
          updatedAt: Date;
          ipAddress?: string | null;
          userAgent?: string | null;
        };
      } | null>;
    }
  }
}

export {};