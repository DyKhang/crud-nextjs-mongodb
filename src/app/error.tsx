"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Container>
      <h2>{error.message}</h2>
      <div className="mt-5 flex items-center gap-3">
        <Button onClick={() => router.replace("/")} variant="secondary">
          Back to home
        </Button>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </Container>
  );
}
