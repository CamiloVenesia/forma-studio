import { Hero } from '../components/sections/Hero';
import { Marquee } from '../components/sections/Marquee';
import { Philosophy } from '../components/sections/Philosophy';
import { ImmersiveStory } from '../components/sections/ImmersiveStory';
import { ProgramsSpotlight } from '../components/sections/ProgramsSpotlight';
import { Journey } from '../components/sections/Journey';
import { SignatureMoment } from '../components/sections/SignatureMoment';
import { AdvisoryTeaser } from '../components/sections/AdvisoryTeaser';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCta } from '../components/sections/FinalCta';

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Philosophy />
      <ImmersiveStory />
      <ProgramsSpotlight />
      <Journey />
      <SignatureMoment />
      <AdvisoryTeaser />
      <FaqSection />
      <FinalCta />
    </>
  );
}
