import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ContactForm from './components/ContactForm';
import ExpertInfo from './components/ExpertInfo';
import OfficeInfo from './components/OfficeInfo';

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />
      <ContactMethods />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm />
            <ExpertInfo />
          </div>
        </div>
      </section>
      <OfficeInfo />
    </main>
  );
}