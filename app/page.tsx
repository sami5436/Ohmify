import { Hero } from "@/components/Hero";
import { CircuitLab } from "@/components/CircuitLab";
import { Concepts } from "@/components/Concepts";
import { AudioCircuit } from "@/components/AudioCircuit";
import { Glossary } from "@/components/Glossary";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <CircuitLab />
      <Concepts />
      <AudioCircuit />
      <Glossary />
      <SiteFooter />
    </>
  );
}
