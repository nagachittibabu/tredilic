import Image from "../../../utils/models/image";
import fs from 'fs';
import path from 'path';
import { NextResponse } from "../../../../node_modules/next/server";

export async function POST(req){
    try {
        const newImage = new Image({
            name: 'example',
            img: {
                data: path.dirname("../images/menswear.png"),
                contentType: 'png'
            }
        });
        await newImage.save();
        return NextResponse.json({ success: true, categories: newImage }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false }, { status: 200 });
    }
}