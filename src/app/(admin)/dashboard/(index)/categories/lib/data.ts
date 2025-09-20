import prisma from "../../../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}
