type SectionProps = {
  children: React.ReactNode;
  backgroundClassName?: string;
};

export default function Section({
  children,
  backgroundClassName = "",
}: SectionProps) {
  return (
    <section className={`w-full ${backgroundClassName}`}>
      <div className="mx-auto w-full max-w-5xl px-4">
        {children}
      </div>
    </section>
  );
}

