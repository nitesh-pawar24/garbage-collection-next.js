'use client';
import GalleryPage from "@/component/GalleryPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <GalleryPage navigate={navigate} />;
}
