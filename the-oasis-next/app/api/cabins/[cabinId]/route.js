import { getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const cabinId = params?.cabinId ?? "";
  try {
    const data = await getCabin(cabinId);
    return Response.json({ status: 200, cabin: data });
  } catch (error) {
    return Response.json({ status: 500, error: error.message });
  }
}
