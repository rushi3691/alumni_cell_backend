import prisma from "./db";

export const UpdatePaidStatus = async (id: number, accounted_by: string) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      paid: true,
      accountedBy: accounted_by,
    },
  });
  return user;
};
