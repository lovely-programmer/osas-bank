import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const { email } = params;

  const body = await req.json();

  const data = parseInt(body);

  try {
    if (data == 3) {
      await prisma.user.update({
        where: { email },
        data: {
          tcc_code_need: true,
          imf_code_need: true,
          tax_code_need: true,
          restricted: true,
        },
      });
    } else if (data == 2) {
      await prisma.user.update({
        where: { email },
        data: {
          tcc_code_need: true,
          tax_code_need: true,
          restricted: true,
        },
      });
    } else if (data == 1) {
      await prisma.user.update({
        where: { email },
        data: {
          tcc_code_need: true,
          restricted: true,
        },
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
