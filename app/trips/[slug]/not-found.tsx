import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export default function TripNotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        title="We could not find that trip"
        body="The journey may have been retired, or the link may be mistyped. Browse our current signature journeys."
        action={<ButtonLink href="/trips">See all trips</ButtonLink>}
      />
    </Container>
  );
}
