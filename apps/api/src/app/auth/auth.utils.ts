import { JwtService } from "@nestjs/jwt";
export const generateTokens = (user, jwtService: JwtService) => {
  const accessToken = jwtService.sign(
    { email: user.email,name: user.name, role: user.role },
  );
  return accessToken;
};
