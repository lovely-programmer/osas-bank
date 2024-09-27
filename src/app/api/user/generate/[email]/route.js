import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const { email } = params;
  const { codeType, codePrice } = await req.json();

  const makeid = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const ALBET = makeid(1);
  let tcc_code = "FT" + Math.floor(Math.random() * 900);
  let imf_code = "FTB" + Math.floor(Math.random() * 9000);
  let tax_code = ALBET + Math.floor(Math.random() * 9000) + "L";

  try {
    if (codeType === "tcc_code") {
      await prisma.user.update({
        where: { email },
        data: {
          tcc_code,
          tcc_code_price: codePrice,
        },
      });
    } else if (codeType === "imf_code") {
      await prisma.user.update({
        where: { email },
        data: {
          imf_code,
          imf_code_price: codePrice,
        },
      });
    } else if (codeType === "tax_code") {
      await prisma.user.update({
        where: { email },
        data: {
          tax_code,
          tax_code_price: codePrice,
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
