import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const body = await req.json();
  const { code } = params;

  try {
    if (code == "tcc") {
      await prisma.user.update({
        where: { email: body },
        data: { tcc_code_need: false },
      });
    } else if (code == "imf") {
      await prisma.user.update({
        where: { email },
        data: { imf_code_need: false },
      });
    } else if (code == "tax") {
      await prisma.user.update({
        where: { email },
        data: { tax_code_need: false },
      });
    }

    return new NextResponse(JSON.stringify({ message: "updated" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
