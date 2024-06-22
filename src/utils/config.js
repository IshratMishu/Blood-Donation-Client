const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
export const imgbb_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export const API = import.meta.env.VITE_Development
  ? "http://localhost:9000"
  : "https://vital-blood-server.vercel.app";
