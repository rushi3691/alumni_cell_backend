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

export const GetAllUsers = async (
  limit: number | undefined,
  offset: number | undefined
) => {
  // role: ALUMNI
  const users = await prisma.user.findMany({
    where: {
      role: "ALUMNI",
    },
    take: limit,
    skip: offset,
  });
  return users;
};

export const GetTotalUsersCount = async () => {
  const count = await prisma.user.count();
  return count;
};

export const GetUnverifiedUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      isVerified: false,
    },
  });
  return users;
};
