import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { PickSofa } from "@/components/PickSofa";

export default async function Home() {
  return (
    <>
      <Hero />

      <Container>
        <PickSofa />
      </Container>
    </>
  );
}
