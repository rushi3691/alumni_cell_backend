import prisma from "./db";

interface ICreateUserData {
  uuid: string;
  email: string;
  name: string;
}

export const create_user = async (user_data: ICreateUserData) => {
  const user = await prisma.user.create({
    data: {
      uuid: user_data.uuid,
      email: user_data.email,
      name: user_data.name,
    },
  });
  return user;
};

interface IUpdateUserData {
  id: number;
  name: string;
  roll_number: string;
  batch: string;
  branch: string;
  mobile: string;
  paid: boolean;
  payment_method: "ONLINE" | "CONSENT";
}

export const update_user = async (user_data: IUpdateUserData) => {
  const user = await prisma.user.update({
    where: {
      id: user_data.id,
    },
    data: {
      name: user_data.name,
      roll_number: user_data.roll_number,
      batch: user_data.batch,
      branch: user_data.branch,
      mobile: user_data.mobile,
      payment_method: user_data.payment_method,
    },
  });
  return user;
};

export const get_user_by_id = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const get_user_by_uuid = async (uuid: string) => {
  const user = await prisma.user.findUnique({
    where: {
      uuid,
    },
  });
  return user;
};

export const delete_user_by_id = async (id: number) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export const delete_user_by_uuid = async (uuid: string) => {
  const user = await prisma.user.delete({
    where: {
      uuid,
    },
  });
  return user;
};
