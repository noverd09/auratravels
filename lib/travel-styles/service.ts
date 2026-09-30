import { travelStyleRepository } from "@/lib/repositories";

export const getTravelStyles = () => travelStyleRepository.list();
export const getTravelStyle = (slug: string) => travelStyleRepository.getBySlug(slug);
