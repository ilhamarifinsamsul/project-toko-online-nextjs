import prisma from "../../../../../../../lib/prisma";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function getBrandById(id: string) {
  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return brand;
  } catch (error) {
    console.log(error);
    return null;
  }
}
