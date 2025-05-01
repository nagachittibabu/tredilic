'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = null;
  const router = useRouter()
  if (!user) {
router.push('/home')
  }
  return (
    <div>
Home
    </div>
  );
}
