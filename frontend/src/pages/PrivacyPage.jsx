import React from "react";
import { Link } from "react-router-dom";
import { useLanguage, useTheme } from "../App";
import { ArrowLeft, Shield, Mail, Lock, Cookie, Eye, Database, UserCheck } from "lucide-react";
import SEO from "../components/SEO";

const LOGO_URL = "/logo-nav.png";
const LOGO_URL_WHITE = "/logo-nav-white.png";

const PrivacyPage = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const lastUpdated = "9 december 2025";

  const content = {
    nl: {
      title: "Privacybeleid",
      subtitle: "Hoe wij omgaan met uw gegevens",
      lastUpdated: "Laatst bijgewerkt",
      backHome: "Terug naar home",
      intro: "Bij Yrvante hechten wij veel waarde aan de privacy van onze bezoekers en klanten. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom wij dit doen en hoe wij deze gegevens beschermen.",
      sections: [
        {
          icon: UserCheck,
          title: "1. Wie zijn wij?",
          content: `Yrvante is een webdesign- en developmentbedrijf gevestigd in Nederland. Wij zijn verantwoordelijk voor de verwerking van uw persoonsgegevens zoals beschreven in dit privacybeleid.

**Contactgegevens:**
- Website: yrvante.com
- E-mail: info@yrvante.com
- Locatie: Nederland`
        },
        {
          icon: Database,
          title: "2. Welke gegevens verzamelen wij?",
          content: `Wij verzamelen de volgende persoonsgegevens:

**Via het contactformulier:**
- Naam
- E-mailadres
- Telefoonnummer (optioneel)
- Uw bericht/vraag
- Geselecteerd pakket (indien van toepassing)

**Automatisch verzamelde gegevens:**
- IP-adres (geanonimiseerd)
- Browsertype en -versie
- Bezochte pagina's
- Datum en tijd van bezoek
- Verwijzende website`
        },
        {
          icon: Eye,
          title: "3. Waarom verzamelen wij deze gegevens?",
          content: `Wij gebruiken uw gegevens voor de volgende doeleinden:

- **Communicatie:** Om contact met u op te nemen over uw aanvraag of vraag
- **Dienstverlening:** Om onze diensten aan u te kunnen leveren
- **Website verbetering:** Om onze website en diensten te verbeteren
- **Bevestigingsmail:** Om u een bevestiging te sturen van uw aanvraag

Wij verwerken uw gegevens alleen op basis van:
- Uw toestemming (bij het invullen van het contactformulier)
- Uitvoering van een overeenkomst
- Ons gerechtvaardigd belang (website analyse en verbetering)`
        },
        {
          icon: Lock,
          title: "4. Hoe beschermen wij uw gegevens?",
          content: `Wij nemen de bescherming van uw gegevens serieus en nemen passende maatregelen:

- **SSL-encryptie:** Alle gegevensoverdracht via onze website is versleuteld
- **Beveiligde servers:** Uw gegevens worden opgeslagen op beveiligde servers
- **Beperkte toegang:** Alleen geautoriseerde personen hebben toegang tot uw gegevens
- **Regelmatige updates:** Onze systemen worden regelmatig bijgewerkt

Wij bewaren uw gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld.`
        },
        {
          icon: Mail,
          title: "5. E-mailcommunicatie",
          content: `Wanneer u het contactformulier invult:

- Ontvangt u een automatische bevestigingsmail
- Kunnen wij contact met u opnemen over uw aanvraag
- Slaan wij uw gegevens op voor de duur van onze communicatie

Voor het versturen van e-mails maken wij gebruik van Resend, een professionele e-maildienst. Uw e-mailadres wordt alleen gebruikt voor directe communicatie met u en wordt niet gedeeld met derden voor marketingdoeleinden.`
        },
        {
          icon: Cookie,
          title: "6. Cookies",
          content: `Onze website maakt gebruik van cookies:

**Functionele cookies:**
- Onthouden van uw taalvoorkeur
- Opslaan van sessie-informatie

**Analytische cookies:**
- Anonieme statistieken over websitegebruik
- Verbetering van de gebruikerservaring

U kunt cookies uitschakelen via uw browserinstellingen. Dit kan echter invloed hebben op de functionaliteit van de website.`
        },
        {
          icon: Shield,
          title: "7. Uw rechten",
          content: `Onder de AVG (Algemene Verordening Gegevensbescherming) heeft u de volgende rechten:

- **Inzage:** U kunt opvragen welke gegevens wij van u hebben
- **Correctie:** U kunt onjuiste gegevens laten corrigeren
- **Verwijdering:** U kunt verzoeken om verwijdering van uw gegevens
- **Beperking:** U kunt verzoeken om beperking van de verwerking
- **Overdracht:** U kunt verzoeken om overdracht van uw gegevens
- **Bezwaar:** U kunt bezwaar maken tegen de verwerking

Om uw rechten uit te oefenen, kunt u contact met ons opnemen via info@yrvante.com. Wij reageren binnen 30 dagen op uw verzoek.`
        },
        {
          icon: Database,
          title: "8. Delen met derden",
          content: `Wij delen uw gegevens alleen met derden wanneer dit noodzakelijk is:

- **E-maildienst (Resend):** Voor het versturen van e-mails
- **Hosting provider:** Voor het hosten van onze website
- **Wettelijke verplichting:** Indien wij hiertoe wettelijk verplicht zijn

Wij verkopen uw gegevens nooit aan derden en gebruiken ze niet voor ongewenste marketingdoeleinden.`
        }
      ],
      contact: {
        title: "9. Contact",
        content: "Heeft u vragen over dit privacybeleid of over de verwerking van uw persoonsgegevens? Neem dan gerust contact met ons op.",
        email: "info@yrvante.com"
      },
      changes: {
        title: "10. Wijzigingen",
        content: "Wij behouden ons het recht voor om dit privacybeleid te wijzigen. Wijzigingen worden op deze pagina gepubliceerd. Wij raden u aan om dit privacybeleid regelmatig te raadplegen."
      }
    },
    en: {
      title: "Privacy Policy",
      subtitle: "How we handle your data",
      lastUpdated: "Last updated",
      backHome: "Back to home",
      intro: "At Yrvante, we value the privacy of our visitors and customers. In this privacy policy, we explain what data we collect, why we do this, and how we protect this data.",
      sections: [
        {
          icon: UserCheck,
          title: "1. Who are we?",
          content: `Yrvante is a web design and development company based in the Netherlands. We are responsible for processing your personal data as described in this privacy policy.

**Contact details:**
- Website: yrvante.com
- Email: info@yrvante.com
- Location: Netherlands`
        },
        {
          icon: Database,
          title: "2. What data do we collect?",
          content: `We collect the following personal data:

**Via the contact form:**
- Name
- Email address
- Phone number (optional)
- Your message/question
- Selected package (if applicable)

**Automatically collected data:**
- IP address (anonymized)
- Browser type and version
- Pages visited
- Date and time of visit
- Referring website`
        },
        {
          icon: Eye,
          title: "3. Why do we collect this data?",
          content: `We use your data for the following purposes:

- **Communication:** To contact you about your request or question
- **Service delivery:** To provide our services to you
- **Website improvement:** To improve our website and services
- **Confirmation email:** To send you a confirmation of your request

We only process your data based on:
- Your consent (when filling out the contact form)
- Performance of a contract
- Our legitimate interest (website analysis and improvement)`
        },
        {
          icon: Lock,
          title: "4. How do we protect your data?",
          content: `We take the protection of your data seriously and implement appropriate measures:

- **SSL encryption:** All data transfer via our website is encrypted
- **Secure servers:** Your data is stored on secure servers
- **Limited access:** Only authorized persons have access to your data
- **Regular updates:** Our systems are regularly updated

We do not retain your data longer than necessary for the purposes for which they were collected.`
        },
        {
          icon: Mail,
          title: "5. Email communication",
          content: `When you fill out the contact form:

- You will receive an automatic confirmation email
- We may contact you about your request
- We store your data for the duration of our communication

For sending emails, we use Resend, a professional email service. Your email address is only used for direct communication with you and is not shared with third parties for marketing purposes.`
        },
        {
          icon: Cookie,
          title: "6. Cookies",
          content: `Our website uses cookies:

**Functional cookies:**
- Remembering your language preference
- Storing session information

**Analytical cookies:**
- Anonymous statistics about website usage
- Improving user experience

You can disable cookies via your browser settings. However, this may affect the functionality of the website.`
        },
        {
          icon: Shield,
          title: "7. Your rights",
          content: `Under the GDPR (General Data Protection Regulation), you have the following rights:

- **Access:** You can request what data we have about you
- **Correction:** You can have incorrect data corrected
- **Deletion:** You can request deletion of your data
- **Restriction:** You can request restriction of processing
- **Portability:** You can request transfer of your data
- **Objection:** You can object to the processing

To exercise your rights, you can contact us at info@yrvante.com. We will respond to your request within 30 days.`
        },
        {
          icon: Database,
          title: "8. Sharing with third parties",
          content: `We only share your data with third parties when necessary:

- **Email service (Resend):** For sending emails
- **Hosting provider:** For hosting our website
- **Legal obligation:** If we are legally required to do so

We never sell your data to third parties and do not use it for unsolicited marketing purposes.`
        }
      ],
      contact: {
        title: "9. Contact",
        content: "Do you have questions about this privacy policy or about the processing of your personal data? Please feel free to contact us.",
        email: "info@yrvante.com"
      },
      changes: {
        title: "10. Changes",
        content: "We reserve the right to change this privacy policy. Changes will be published on this page. We recommend that you consult this privacy policy regularly."
      }
    }
  };

  const t = content[language] || content.nl;

  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-black dark:text-white mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split(':**');
        return (
          <p key={i} className="ml-4 mb-1">
            <span className="font-semibold">• {parts[0]}:</span>{parts[1]}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return <p key={i} className="ml-4 mb-1">• {line.replace('- ', '')}</p>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return <p key={i} className="mb-2">{line}</p>;
    });
  };

  return (
    <div data-testid="privacy-page" className="min-h-screen bg-white dark:bg-neutral-950">
      <SEO 
        page="/privacy"
        customTitle={`${t.title} | Yrvante`}
        customDescription={t.intro}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 w-auto hidden dark:block" />
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              {t.backHome}
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 bg-gradient-to-b from-gray-50 dark:from-neutral-900 to-white dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
            <Shield size={14} />
            {t.title}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 sm:mb-4">
            {t.title}
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
            {t.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            {t.lastUpdated}: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Intro */}
          <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              {t.intro}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {t.sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <section key={index} className="bg-gray-50 dark:bg-neutral-800/60 rounded-2xl p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-black rounded-xl flex-shrink-0">
                      <Icon className="text-white" size={20} />
                    </div>
                    <h2 className="text-lg sm:text-2xl font-bold text-black dark:text-white pt-1 sm:pt-2">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed pl-0 md:pl-16">
                    {formatContent(section.content)}
                  </div>
                </section>
              );
            })}

            {/* Contact Section */}
            <section className="bg-black dark:bg-white text-white dark:text-black rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t.contact.title}</h2>
              <p className="text-gray-300 mb-6">{t.contact.content}</p>
              <a 
                href={`mailto:${t.contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Mail size={18} />
                {t.contact.email}
              </a>
            </section>

            {/* Changes Section */}
            <section className="border border-gray-200 dark:border-neutral-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">{t.changes.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{t.changes.content}</p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link to="/" className="inline-block mb-4">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto mx-auto dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 w-auto mx-auto hidden dark:block" />
          </Link>
          <p className="text-sm text-gray-500">
            © {currentYear} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/pakketten" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              {language === 'nl' ? 'Pakketten' : 'Packages'}
            </Link>
            <Link to="/privacy" className="text-black dark:text-white font-medium">
              {language === 'nl' ? 'Privacy' : 'Privacy'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPage;
