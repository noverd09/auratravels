"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 md:py-40">
      <h1 className="text-5xl leading-none tracking-[-0.035em] md:text-7xl">Something went wrong.</h1>
      <p className="mt-6 max-w-[520px] text-xl text-muted" role="alert">
        We could not load this page. Please try again, or head back to the homepage.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="secondary">
          Back to the homepage
        </ButtonLink>
      </div>
    </Container>
  );
}
