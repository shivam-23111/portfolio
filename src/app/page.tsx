import PortfolioExperience from "@/components/portfolio-experience";
import { profile, projects } from "@/lib/data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "AI Post-Training Associate",
    email: profile.email,
    telephone: profile.phone,
    url: "https://shivam-tiwari.dev",
    sameAs: [profile.linkedin, profile.github, profile.leetcode],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Noida Institute of Engineering and Technology, Greater Noida",
    },
    knowsAbout: [
      "LLM Post-Training",
      "Prompt Engineering",
      "Data Curation",
      "Next.js",
      "Docker",
      "IoT",
      "Raspberry Pi",
    ],
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      url: `https://shivam-tiwari.dev/projects/${project.slug}`,
      codeRepository: project.github,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioExperience />
    </>
  );
}
