import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Stack />
      <Contact />
    </main>
  );
}
