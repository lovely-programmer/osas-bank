import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function zodPersonalInfoConfig() {
  const schema = z.object({
    name: z.string().min(5).max(50),
    occupation: z.string().min(3).max(15),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  return { register, errors, handleSubmit, setValue };
}

export function zodAddressInfoConfig() {
  const schema = z.object({
    address: z.string().min(5).max(50),
    city: z.string().min(2).max(15),
    state: z.string().min(2).max(15),
    zip_code: z.string().min(5).max(10),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  return { register, errors, handleSubmit, setValue };
}

export function zodAccountInfoConfig() {
  const schema = z.object({
    email: z.string().email(),
    phoneNumber: z.string().min(10).max(25),
    username: z.string().min(2).max(50),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  return { register, errors, handleSubmit, setValue };
}

export function zodVerifyIdentityConfig() {
  const schema = z.object({
    social_security: z.string().min(9).max(9),
    confirm_social: z.string().min(9).max(9),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  return { register, errors, handleSubmit, setValue };
}

export function zodTransferConfig() {
  const schema = z.object({
    accountNumber: z.string().min(10).max(10),
    accountName: z.string().min(5).max(50),
    bankName: z.string().min(3).max(50),
    routingNumber: z.string().min(9).max(9),
    amount: z.string().min(3).max(50),
    swift_code: z.string().min(4).max(30),
    remark: z.string().min(2).max(30),
    remark: z.string().min(2).max(30),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  return { register, errors, handleSubmit, setValue };
}
