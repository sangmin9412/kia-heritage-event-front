import { CreateCompletePosterContainer } from "@/app/(withLayout)/create/complete/[posterId]/(components)/container";

export default async function CreateCompletePosterPage({ params }: { params: Promise<{ posterId: string }> }) {
  const { posterId } = await params;
  return <CreateCompletePosterContainer posterId={posterId} />;
}
