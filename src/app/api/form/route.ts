// api for view form in server

import { NextResponse, NextRequest } from "next/server";
import { NextApiResponse } from "next";
import prisma from "@/libs/prisma";
//conseguir session de usuario
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function GET() {
  const defects = await prisma.carros
    .findMany
    //   {
    //   select: {
    //     id: true,
    //     VIN: true,
    //     Model: true,
    //     Color: true,
    //     DetectedBy: true,
    //     Issue: true,
    //     AreaResponsible: true,
    //     requestor: true,
    //     Notes: true,
    //     Status: true,
    //     Ubicacion: true,
    //     ReportedDate: true,
    //   },
    // }
    ();
  // console.log(defects);
  if (!defects) {
    return NextResponse.json({ message: "No se encontraron reportes" });
  }

  return NextResponse.json({ defects });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        message: "No autorizado",
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        employID: session.user?.name ?? "",
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "Usuario no encontrado",
      });
    }
    // console.log(data);
    const newDefect = await prisma.carros.create({
      data: {
        VIN: data.serialNumber, // VIN único del carro
        Model: data.model,
        Color: data.color,
        DetectedBy: user.employID, // Este debe coincidir con employID del usuario en la tabla users
        Issue: data.issue,
        AreaResponsible: data.AreaResponsible,
        requestor: data.Requestor,
        Notes: data.Notes,
        Status: "Pendiente",
        Ubicacion: "NA",
      },
    });
    // console.log(newDefect)
    const { id, ...rest } = newDefect;

    return NextResponse.json({
      message: "Formulario enviado",
      id,
    });
  } catch (error) {
    console.error("Error procesando la solicitud:", error);

    // Devuelve una respuesta de error si algo sale mal
    return NextResponse.json(
      { message: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
