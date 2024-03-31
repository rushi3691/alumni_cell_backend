import { IUpdateStaffData, IUpdateUserData } from "../api/auth/validator";
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

// interface IUpdateUserData {
//   id: number;
//   name: string;
//   dob: Date;
//   gender: "MALE" | "FEMALE" | "OTHER";
//   institute_number: string;
//   joining_year: string;
//   graduation_year: string;
//   program: "BTECH" | "MTECH" | "PHD";
//   branch: string;
//   hostel_room_no: string;
//   address: string;
//   mobile: string;
//   linkedin: string;
//   twitter: string;
//   github: string;
//   work_experience: string[];
//   skills: string[];
//   payment_method: "ONLINE" | "CONSENT";
// }

export const update_user = async (user_data: IUpdateUserData | IUpdateStaffData) => {
  const user = await prisma.user.update({
    where: {
      id: user_data.id,
    },
    data: {
      // name: user_data.name,
      // dob: user_data.dob,
      // gender: user_data.gender,
      // role: user_data.role,
      // institute_number: user_data.institute_number,
      // joining_year: user_data.joining_year,
      // graduation_year: user_data.graduation_year,
      // program: user_data.program,
      // branch: user_data.branch,
      // hostel_room_no: user_data.hostel_room_no,
      // address: user_data.address,
      // mobile: user_data.mobile,
      // linkedin: user_data.linkedin,
      // twitter: user_data.twitter,
      // github: user_data.github,
      // work_experience: user_data.work_experience,
      // skills: user_data.skills,
      // payment_method: user_data.payment_method,

      ...user_data,
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
