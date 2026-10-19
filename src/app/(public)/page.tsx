import { apiGet } from "@/lib/api/server";

async function getApiStatus(): Promise<string> {
  try {
    const health = await apiGet<{ status: string }>("/health", { noStore: true });
    return health?.status ?? "Unreachable";
  } catch {
    return "Unreachable";
  }
}

export default async function HomePage() {
  const status = await getApiStatus();
  return (
    <main className="flex flex-1 items-center justify-center p-8">
      {/* Một text node duy nhất để HTML không bị chèn <!-- --> giữa các phần */}
      <p>{`API: ${status}`}</p>
    </main>
  );
}
