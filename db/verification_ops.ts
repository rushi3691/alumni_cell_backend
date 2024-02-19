import prisma from "./db";

export const UpdateVerificationStatus = async (
  id: number,
  verified_by: string
) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified: true,
      verifiedBy: verified_by,
    },
  });
  return user;
};

export const UpdateMembershipStatus = async (
  id: number,
  membership_status: boolean
) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isMember: membership_status,
    },
  });
  return user;
};
