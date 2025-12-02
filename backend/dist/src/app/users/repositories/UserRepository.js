"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  login(email: string, password: string, device: string, ip?: string) {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) throw new Error("Credenciales inválidas");
//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) throw new Error("Credenciales inválidas");
//   const accessToken = generateAccessToken({ userId: user.id });
//   const refreshToken = generateRefreshToken();
//   const refreshTokenHash = await hashToken(refreshToken);
//   await prisma.session.create({
//     data: {
//       userId: user.id,
//       device,
//       ip,
//       refreshTokenHash,
//       expiresAt: getRefreshExpiryDate(),
//     }
//   });
//   return { accessToken, refreshToken };
// }
