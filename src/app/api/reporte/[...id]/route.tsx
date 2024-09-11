import { NextResponse, NextRequest} from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req: NextRequest) {

    const id = req.url.split("/").pop();
    const defectReport=await prisma.carros.findUnique({
        where: {
            id: id,
        },
    })
    console.log(defectReport);
    if (!defectReport) {
        return NextResponse.json({ message: "No se encontró el reporte" });
    }
    return NextResponse.json({
        message: "Reporte encontrado",
        defectReport
    });
}
