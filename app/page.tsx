import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <section className="w-full h-159">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full h-full">
              <Card className="h-full rounded-none border-0  bg-violet-500">
                <CardContent className="flex h-full items-center justify-center text-5xl font-bold">
                  {index + 1}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}
