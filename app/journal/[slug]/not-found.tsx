import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ArticleNotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        title="We could not find that article"
        body="It may have been unpublished, or the link may be mistyped."
        action={<ButtonLink href="/journal">Back to the journal</ButtonLink>}
      />
    </Container>
  );
}
