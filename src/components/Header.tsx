import { signOutAction } from "@/app/actions";
import { Search } from "@/components/Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import {
  BaggageClaim,
  CircleUserRound,
  Heart,
  Key,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-[#005D63] py-[28px] text-white">
      <div className="mx-auto max-w-[80%]">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="cursor-pointer text-[24px]">
            Pursuit
          </Link>
          <Search />

          <div className="flex gap-[20px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {session ? (
                  <div className="relative size-[24px] cursor-pointer overflow-hidden rounded-full">
                    <Image
                      alt={session.user!.name!}
                      src={session.user!.image!}
                      fill
                    />
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <CircleUserRound size={24} />
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <Link href="/signin">
                  <DropdownMenuItem className="cursor-pointer">
                    <Key />
                    <span>Login</span>
                  </DropdownMenuItem>
                </Link>
                <form action={signOutAction}>
                  <button className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex cursor-pointer items-end gap-1">
              <Heart size={24} />
              <span>(0)</span>
            </div>

            <div className="flex cursor-pointer items-end gap-1">
              <BaggageClaim size={24} />
              <span>(0)</span>
            </div>
          </div>
        </div>

        <div className="ml-[170px] mt-[28px] flex gap-[40px] text-[16px] font-[200]">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <Link href={"/add-product"}>Add Product</Link>
        </div>
      </div>
    </header>
  );
};
