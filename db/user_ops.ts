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

export const update_user = async (user_data: IUpdateUserData) => {
  const user = await prisma.user.update({
    where: {
      id: user_data.id,
    },
    data: {
      name: user_data.name,
      dob: user_data.dob,
      gender: user_data.gender,
      role: user_data.role,
      institute_number: user_data.institute_number,
      joining_year: user_data.joining_year,
      mobile: user_data.mobile,
      graduation_year: user_data.graduation_year,
      program: user_data.program,
      branch: user_data.branch,
      hostel_room_no: user_data.hostel_room_no,
      address: user_data.address,
      linkedin: user_data.linkedin,
      twitter: user_data.twitter,
      github: user_data.github,
      work_experience: user_data.work_experience,
      skills: user_data.skills,
      payment_method: user_data.payment_method,
      // ...user_data,
    },
  });
  return user;
};

export const update_staff = async (staff_data: IUpdateStaffData) => {
  const staff = await prisma.user.update({
    where: {
      id: staff_data.id,
    },
    data: {
      name: staff_data.name,
      dob: staff_data.dob,
      gender: staff_data.gender,
      role: staff_data.role,
      institute_number: staff_data.institute_number,
      joining_year: staff_data.joining_year,
      mobile: staff_data.mobile,
    },
  });
  return staff;
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

// update user's paid status
export const update_user_paid_status = async (id: number) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      paid: true,
    },
  });
  return user;
};
