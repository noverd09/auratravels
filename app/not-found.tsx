import { AuraMark } from "@/components/ui/AuraMark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-40">
      <AuraMark size={44} />
      <h1 className="mt-8 text-5xl leading-none tracking-[-0.035em] md:text-8xl">
        This road does not lead anywhere.
      </h1>
      <p className="mt-6 max-w-[520px] text-xl text-muted">
        The page you are looking for has moved or never existed. Start again from somewhere we know.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" arrow>
          Back to the homepage
        </ButtonLink>
        <ButtonLink href="/destinations" variant="secondary">
          Explore destinations
        </ButtonLink>
      </div>
    </Container>
  );
}
