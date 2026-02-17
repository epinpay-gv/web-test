import Section from "@/components/layout/Section/Section";

export default function BlogHeroSection() {
    return (
        <Section backgroundClassName="w-full bg-(--bg-brand-softer)">
            <div className="mx-auto w-full max-w-5xl px-4">
                <h1 className="text-(--text-heading) font-semibold size-5">Blog</h1>
            </div>
        </Section>
    )
}