import { signInAction } from "@/app/actions";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function page() {
  return (
    <Container className="flex justify-center">
      <form action={signInAction}>
        <Button className="mt-4 w-[300px]">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="google-logo"
            height={24}
            width={24}
          />
        </Button>
      </form>
    </Container>
  );
}
