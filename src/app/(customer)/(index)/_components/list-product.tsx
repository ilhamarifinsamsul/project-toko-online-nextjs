import React, { ReactNode } from "react";
import {
  getProducts,
  getMostPickedProducts,
  getNewReleaseProducts,
} from "../lib/data";
import Link from "next/link";
import { rupiah } from "@/lib/utils";

// membuat props
interface ListProductProps {
  title: ReactNode;
  type: "most-picked" | "new-release";
}

export default async function ListProduct({ title, type }: ListProductProps) {
  const product =
    type === "most-picked"
      ? await getMostPickedProducts()
      : await getNewReleaseProducts();
  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">{title}</h2>
        <a
          href="catalog.html"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </a>
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        {product.map((product) => (
          <Link
            href="#"
            className="product-card"
            key={product.name + product.id}
          >
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <img
                  src={product.image_url}
                  className="w-full h-full object-contain"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold leading-[22px]">{product.name}</p>
                  <p className="text-sm text-[#616369]">
                    {product.category.name}
                  </p>
                </div>
                <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                  {rupiah(Number(product.price))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
