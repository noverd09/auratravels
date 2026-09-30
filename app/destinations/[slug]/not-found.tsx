import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export default function DestinationNotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        title="We could not find that destination"
        body="It may have moved, or the link may be mistyped. Browse the places we plan trips to."
        action={<ButtonLink href="/destinations">See all destinations</ButtonLink>}
      />
    </Container>
  );
}
