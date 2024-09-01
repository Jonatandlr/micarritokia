// api for view form in server

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/prisma";
//conseguir session de usuario
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export function GET() {
  return NextResponse.json({
    message: "Formulario de reporte",
  });
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
        VIN:data.serialNumber, // VIN único del carro
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

    return NextResponse.json({
      message: "Formulario enviado",
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
