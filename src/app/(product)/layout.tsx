import { Container } from "@/components/Container";

export default function layout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
