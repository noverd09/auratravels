import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export default function StyleNotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        title="We could not find that experience"
        body="Choose one of our six travel styles instead."
        action={<ButtonLink href="/experiences">See all experiences</ButtonLink>}
      />
    </Container>
  );
}
