export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream min-h-screen">
      <section className="relative bg-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-terracotta-light font-medium text-sm tracking-widest uppercase">
            Legal
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            {title}
          </h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-mid leading-relaxed [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:text-texto [&_h2]:mt-10 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:text-texto [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_a]:text-terracotta hover:[&_a]:text-terracotta-light [&_strong]:text-texto">
          {children}
        </div>
      </section>
    </div>
  );
}
