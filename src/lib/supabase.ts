// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
// // Create a single supabase client for interacting with your database
// const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// export const getImageUrl = (
//   name: string,
//   path: "brands" | "products" = "brands"
// ) => {
//   const { data } = supabase.storage
//     .from("belanja")
//     .getPublicUrl(`public/${path}/${name}`);

//   return data.publicUrl;
// };

// export const uploadFile = async (
//   file: File,
//   path: "brands" | "products" = "brands"
// ) => {
//   const fileType = file.type.split("/")[1];
//   const fileName = `${path}-${Date.now()}.${fileType}`;
//   await supabase.storage
//     .from("belanja")
//     .upload(`public/${path}/${fileName}`, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   return fileName;
// };

// export const deleteFile = async (
//   filename: string,
//   path: "brands" | "products" = "brands"
// ) => {
//   await supabase.storage.from("belanja").remove([`public/${path}/${filename}`]);
// };

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Changed from NEXT_PUBLIC_SUPABASE_KEY

// Add validation to prevent runtime errors
if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (
  name: string,
  path: "brands" | "products" = "brands"
) => {
  const { data } = supabase.storage
    .from("belanja")
    .getPublicUrl(`public/${path}/${name}`);

  return data.publicUrl;
};

export const uploadFile = async (
  file: File,
  path: "brands" | "products" = "brands"
) => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase.storage
    .from("belanja")
    .upload(`public/${path}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return fileName;
};

export const deleteFile = async (
  filename: string,
  path: "brands" | "products" = "brands"
) => {
  const { error } = await supabase.storage
    .from("belanja")
    .remove([`public/${path}/${filename}`]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
};

export default supabase;
