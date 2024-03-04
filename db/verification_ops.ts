import prisma from "./db";

export const UpdateVerificationStatus = async (
  id: number,
  verified_by: string
) => {
  const user = await prisma.user.update({
    where: { id },
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
  if (membership_status) {
    return await MakeMember(id);
  } else {
    return await RemoveMember(id);
  }
};

const MakeMember = async (id: number) => {
  const user = await prisma.user.update({
    where: { id, isVerified: true, paid: true },
    data: {
      isMember: true,
    },
  });
  return user;
};

const RemoveMember = async (id: number) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      isMember: false,
    },
  });
  return user;
};

export const GetAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const GetUnverifiedUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      isVerified: false,
    },
  });
  return users;
};
