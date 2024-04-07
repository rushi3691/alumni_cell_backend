import prisma from "./db";

export const get_staff = async () => {
  // role: "VERIFICATION_STAFF" | "PAYMENT_STAFF"
  const staff = await prisma.user.findMany({
    where: {
      role: {
        in: ["VERIFICATION_STAFF", "PAYMENT_STAFF"],
      },
    },
  });
  return staff;
};
