import { connectDB } from "@/lib/db";
import { Products } from "@/models/product";
import { NextRequest } from "next/server";

const PAGE_SIZE = 5;

export async function GET(res: NextRequest) {
  try {
    const searchParams = res.nextUrl.searchParams;
    const page = searchParams.get("page");
    await connectDB();
    if (page) {
      const startIndex = (parseInt(page) - 1) * PAGE_SIZE;

      const products = await Products.find().skip(startIndex).limit(PAGE_SIZE);
      const totalProduct = await Products.countDocuments();

      return Response.json(
        { products, totalProduct, pageSize: PAGE_SIZE },
        {
          status: 200,
        },
      );
    }
    const products = await Products.find();
    return Response.json(
      { products },
      {
        status: 200,
      },
    );
  } catch {
    return Response.json("Products not found", {
      status: 404,
    });
  }
}

// tại trang 1: currentPage = 1; tổng phần tử 3; => startIndex = 0, endIndex = 2
