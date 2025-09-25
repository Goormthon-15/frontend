import { DetailContent } from "./_components/DetailContent";

interface HospitalDetailPageProps {
  params: {
    id: string;
  };
}

export default function HospitalDetailPage({
  params,
}: HospitalDetailPageProps) {
  return <DetailContent hospitalId={params.id} />;
}
