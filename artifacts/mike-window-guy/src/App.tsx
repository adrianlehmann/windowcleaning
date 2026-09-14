import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  House,
  MapPin,
  Menu,
  Phone,
  ScreenShare,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Wrench,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';

const phoneHref = 'tel:+15204833468';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Service Area', href: '#service-area' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    icon: Droplets,
    number: '01',
    title: 'Window Cleaning',
    copy: 'Get your windows looking bright, clean, and clear again. Mike The Window Guy provides thorough window cleaning for residential customers in the Casa Grande area and surrounding communities.',
  },
  {
    icon: ScreenShare,
    number: '02',
    title: 'Screen Cleaning',
    copy: 'Dirty screens can make otherwise clean windows look dusty and dull. Mike The Window Guy specializes in window and screen cleaning to help restore a cleaner, brighter view.',
  },
  {
    icon: Wrench,
    number: '03',
    title: 'Window Track Cleaning',
    copy: 'Window tracks collect dust, dirt, and debris over time. Track cleaning helps take care of one of the easiest-to-overlook parts of a window.',
  },
  {
    icon: Sparkles,
    number: '04',
    title: 'Water Spot Treatment',
    copy: 'Mineral deposits and water spots can build up on glass and affect its appearance. Mike The Window Guy offers water spot treatment as part of his specialized window services.',
  },
  {
    icon: Sun,
    number: '05',
    title: 'Solar Screen Cleaning',
    copy: 'Arizona dust can quickly build up on screens. Professional solar screen cleaning helps keep them looking cleaner and helps maintain a better-looking exterior.',
  },
  {
    icon: Wrench,
    number: '06',
    title: 'Screen Repairs',
    copy: 'Mike also offers additional screen-related services, including screen repairs and solar screen cleaning.',
  },
];

const reviews = [
  'WINDOWS CRYSTAL CLEAR!',
  'MIKE MET THEM ALL.',
  'He does great work',
  'Mike did a phenomenal job cleaning my windows thoroughly',
  'The house feels lighter, cleaner, airier.',
  'My windows look spotless and crystal clear.',
  'He is very friendly, professional and very detailed with his work.',
  'Michael did an Amazing job on my new windows!',
  'Great communication!',
  "If you're looking for a 'window guy' call Michael!",
];

const areas = [
  'Ahwatukee / Phoenix',
  'Arizona City',
  'Coolidge',
  'Gilbert',
  'Casa Grande',
  'Chandler',
  'Florence',
  'Maricopa',
  'Queen Creek',
];

function formatUSPhone(value: string, isDeleting = false): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 3) return `(${digits}`;
  if (digits.length === 3) return isDeleting ? `(${digits}` : `(${digits}) `;
  if (digits.length < 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length === 6) {
    return isDeleting
      ? `(${digits.slice(0, 3)}) ${digits.slice(3)}`
      : `(${digits.slice(0, 3)}) ${digits.slice(3)}-`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const faqs = [
  {
    question: 'What services does Mike The Window Guy provide?',
    answer:
      'Mike provides window cleaning, screen cleaning, window track cleaning, water spot treatment, solar screen cleaning, and additional screen-related services including screen repairs.',
  },
  {
    question: 'Do you clean window screens?',
    answer:
      'Yes. Window and screen cleaning are core services, and Mike also offers solar screen cleaning.',
  },
  {
    question: 'Do you clean window tracks?',
    answer:
      'Yes. Window track cleaning helps take care of the dust, dirt, and debris that collect in this often-overlooked part of a window.',
  },
  {
    question: 'Do you offer water spot treatment?',
    answer:
      'Yes. Mike offers water spot treatment for mineral deposits and water spots that can affect the appearance of glass.',
  },
  {
    question: 'Do you serve areas outside Casa Grande?',
    answer:
      'Yes. Mike serves Casa Grande and surrounding Arizona communities, including Ahwatukee / Phoenix, Arizona City, Coolidge, Gilbert, Chandler, Florence, Maricopa, and Queen Creek.',
  },
  {
    question: 'Do you offer recurring cleaning?',
    answer:
      'Yes. Once your windows are clean, recurring service can make it easier to keep them that way. Ask about recurring cleaning options.',
  },
];

function ReviewStars() {
  return (
    <span className="flex gap-0.5 text-[#d8962e]" aria-label="5 star review">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={12} fill="currentColor" strokeWidth={1.5} />
      ))}
    </span>
  );
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5" data-testid="link-logo">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9b65f] text-[#173b4f] shadow-[0_5px_14px_rgba(223,169,79,.25)]">
        <span className="absolute inset-[7px] rounded-[5px] border-2 border-[#173b4f]" />
        <span className="absolute left-1/2 top-[7px] h-[24px] w-px -translate-x-1/2 bg-[#173b4f]" />
        <span className="absolute left-[7px] top-1/2 h-px w-[24px] -translate-y-1/2 bg-[#173b4f]" />
      </span>
      <span className="leading-none">
        <span className="block font-[var(--app-font-serif)] text-[.76rem] font-extrabold tracking-[.18em] text-[#173b4f]">
          MIKE THE
        </span>
        <span className="block font-[var(--app-font-serif)] text-[1.08rem] font-extrabold tracking-[.08em] text-[#147a91]">
          WINDOW GUY
        </span>
      </span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    document.title = 'Mike The Window Guy | Window Cleaning in Casa Grande, AZ';
    const description =
      'Professional window, screen, track cleaning and water spot treatment in Casa Grande, AZ and surrounding communities. 15+ years of experience.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
    if (ogDescription) ogDescription.setAttribute('content', description);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'MIKE THE WINDOW GUY',
      telephone: '+1 520-483-3468',
      url: window.location.origin,
      areaServed: areas.map((name) => ({ '@type': 'Place', name })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '07:00',
          closes: '17:00',
        },
      ],
    };
    let jsonLd = document.querySelector('#mike-window-guy-jsonld');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'mike-window-guy-jsonld';
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      service: String(data.get('service') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(values.phone)) {
      setSubmitError('Enter a valid 10-digit US phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        'https://n8n-stripe.localpackmonster.com/webhook/form-submission',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        },
      );

      const result: { success: 'true' | 'false' } = await response.json();

      if (result.success !== 'true') {
        throw new Error('Failed to send message');
      }

      form.reset();
      setPhone('');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ErrorBoundary resetKey="home">
      <div className="min-h-[100dvh] overflow-x-hidden bg-[#f4fafb] text-[#173b4f]">
        <div className="bg-[#173b4f] text-[#f6fbfc]">
          <div className="site-shell flex min-h-9 items-center justify-between gap-4 text-[.72rem] font-semibold tracking-[.02em]">
            <span className="hidden sm:inline">Local window care for Casa Grande and nearby communities.</span>
            <a
              href={phoneHref}
              className="ml-auto flex items-center gap-2 py-2 transition-colors hover:text-[#e9b65f]"
              data-testid="link-top-phone"
            >
              <Phone size={13} strokeWidth={2.5} />
              <span>520-483-3468</span>
            </a>
          </div>
        </div>

        <header className="sticky top-0 z-40 border-b border-[#cfe1e5]/80 bg-[#f4fafb]/95 backdrop-blur-md">
          <div className="site-shell flex h-[4.65rem] items-center justify-between gap-6">
            <Logo />
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[.82rem] font-semibold text-[#496774] transition-colors hover:text-[#147a91]"
                  data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={phoneHref}
              className="hidden items-center gap-2 rounded-full bg-[#147a91] px-5 py-2.5 text-[.78rem] font-bold text-white shadow-[0_7px_18px_rgba(20,122,145,.2)] transition-transform hover:-translate-y-0.5 sm:flex"
              data-testid="link-header-call"
            >
              <Phone size={15} />
              Call Mike
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c3d9df] text-[#173b4f] lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {menuOpen && (
            <nav className="site-shell border-t border-[#dce9eb] pb-4 pt-3 lg:hidden" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="block border-b border-[#e1edef] py-3 text-sm font-semibold text-[#294b5c]"
                  data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={phoneHref}
                onClick={closeMenu}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#147a91] py-3 text-sm font-bold text-white"
                data-testid="link-mobile-call"
              >
                <Phone size={16} /> Call 520-483-3468
              </a>
            </nav>
          )}
        </header>

        <main>
          <section id="home" className="relative overflow-hidden bg-[#e7f4f7]">
            <div className="absolute -right-24 top-12 h-72 w-72 rounded-full border border-[#b8dce3] opacity-60" />
            <div className="absolute -right-7 top-28 h-48 w-48 rounded-full border border-[#b8dce3] opacity-60" />
            <div className="site-shell grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:py-20">
              <div className="relative z-10">
                <div className="eyebrow reveal">Casa Grande, Arizona · residential window care</div>
                <h1 className="display-font reveal reveal-delay-1 mt-5 max-w-[680px] text-[clamp(3.2rem,7vw,6.2rem)] font-extrabold leading-[.94] tracking-[-.065em] text-[#173b4f]">
                  Crystal-Clear
                  <span className="block text-[#147a91]">Windows.</span>
                  <span className="block">Meticulous Service.</span>
                </h1>
                <p className="reveal reveal-delay-2 mt-7 max-w-[540px] text-[1.05rem] leading-8 text-[#4a6a76]">
                  Professional window, screen, and track cleaning for homes throughout Casa Grande and surrounding Arizona communities.
                </p>
                <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#173b4f] px-6 py-3.5 text-sm font-bold text-white shadow-[0_9px_22px_rgba(23,59,79,.18)] transition-transform hover:-translate-y-0.5"
                    data-testid="link-hero-contact"
                  >
                    Request service <ArrowUpRight size={17} />
                  </a>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8bbbc4] bg-[#f7fcfd]/60 px-6 py-3.5 text-sm font-bold text-[#173b4f] transition-colors hover:bg-white"
                    data-testid="link-hero-call"
                  >
                    <Phone size={16} /> 520-483-3468
                  </a>
                </div>
                <div className="reveal reveal-delay-4 mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[.77rem] font-semibold text-[#52727c]">
                  <span className="flex items-center gap-2"><Check size={15} className="text-[#147a91]" /> 15+ years of experience</span>
                  <span className="flex items-center gap-2"><Check size={15} className="text-[#147a91]" /> Local to Casa Grande</span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[570px] lg:justify-self-end">
                <div className="absolute -left-5 top-10 z-20 hidden rounded-2xl border border-[#d2e4e8] bg-white p-4 shadow-[0_16px_34px_rgba(19,52,74,.12)] sm:block">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7e7c6] text-[#9a6e23]"><Sun size={18} /></span>
                    <span>
                      <strong className="block font-[var(--app-font-serif)] text-xl leading-none text-[#173b4f]">15+</strong>
                      <span className="mt-1 block text-[.68rem] font-semibold text-[#68828b]">years of experience</span>
                    </span>
                  </div>
                </div>
                <div className="window-sheen relative min-h-[445px] overflow-hidden rounded-[2rem] border-[10px] border-white bg-[#8bc8d2] shadow-[0_26px_55px_rgba(19,52,74,.18)]">
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.38),transparent_29%,rgba(255,255,255,.14)_68%,rgba(31,105,125,.18))]" />
                  <div className="absolute inset-[13%_14%_12%] grid grid-cols-2 grid-rows-2 gap-4 rounded-sm border-[8px] border-[#eef9f8]/80 bg-[#b9e4e5]/50 p-3 shadow-inner">
                    <div className="relative overflow-hidden bg-[#90cad2]"><div className="absolute -left-7 bottom-0 h-28 w-48 rotate-[12deg] rounded-[50%] bg-[#6ca7a6]/75" /><div className="absolute bottom-0 left-1/3 h-36 w-20 rotate-[25deg] bg-[#d6e7c5]/65" /></div>
                    <div className="relative overflow-hidden bg-[#b2dfe3]"><div className="absolute -right-10 top-3 h-36 w-36 rounded-full bg-[#f5d58e]/70 blur-[1px]" /><div className="absolute bottom-0 left-0 h-14 w-full bg-[#7cae9f]/65" /></div>
                    <div className="relative overflow-hidden bg-[#87c4ce]"><div className="absolute bottom-0 left-0 h-20 w-full bg-[#608e88]/55" /><div className="absolute bottom-8 left-1/2 h-36 w-14 -translate-x-1/2 rotate-[12deg] bg-[#f3e0ae]/70" /></div>
                    <div className="relative overflow-hidden bg-[#a8dce0]"><div className="absolute -left-4 bottom-0 h-24 w-44 rounded-[50%] bg-[#759f91]/55" /><div className="absolute right-4 top-5 h-24 w-14 rotate-[28deg] bg-[#edf1d0]/60" /></div>
                    <span className="pointer-events-none absolute inset-0 border-[3px] border-white/45" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/50 bg-[#173b4f]/85 px-4 py-3 text-white backdrop-blur-sm">
                    <span className="text-[.7rem] font-semibold tracking-[.12em]">CLEARER VIEWS</span>
                    <span className="flex items-center gap-1.5 text-[.7rem] font-bold text-[#e9b65f]"><Sparkles size={13} /> DONE RIGHT</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#d6e6e9] bg-white" aria-label="Trust points">
            <div className="site-shell grid divide-y divide-[#e1edef] py-2 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {[
                ['15+ Years', 'of experience'],
                ['Detailed', 'cleaning'],
                ['Crystal-Clear', 'results'],
                ['Local to', 'Casa Grande'],
              ].map(([title, copy], index) => (
                <div className="flex items-center gap-3 px-3 py-4 lg:justify-center" key={title} data-testid={`text-trust-${index}`}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f4f7] text-[#147a91]"><Check size={15} strokeWidth={3} /></span>
                  <span><strong className="block font-[var(--app-font-serif)] text-[.92rem] text-[#173b4f]">{title}</strong><span className="text-[.7rem] text-[#67838c]">{copy}</span></span>
                </div>
              ))}
            </div>
          </section>

          <section id="about" className="site-shell grid gap-12 py-24 lg:grid-cols-[.75fr_1.25fr] lg:gap-24 lg:py-32">
            <div>
              <div className="eyebrow">The overlooked details matter</div>
              <h2 className="display-font mt-4 text-[clamp(2.4rem,5vw,4.3rem)] font-extrabold leading-[.98] tracking-[-.055em] text-[#173b4f]">
                A brighter home starts at the glass.
              </h2>
            </div>
            <div className="max-w-[660px]">
              <p className="text-[1.15rem] leading-8 text-[#476875]">
                Over 15 years experience, specialized in window n screen cleaning, water spot treatment, track cleaning.
              </p>
              <p className="mt-5 leading-7 text-[#66818b]">
                Mike The Window Guy focuses on the details that make a noticeable difference—from the glass itself to screens and tracks. Depending on your service, cleaning can address the glass, screens, and tracks that contribute to an overall cleaner window.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {[
                  [House, 'Residential focus'],
                  [ShieldCheck, 'Detail-oriented'],
                  [MapPin, 'Arizona local'],
                ].map(([Icon, label]) => (
                  <div className="rounded-xl border border-[#d6e6e9] bg-white p-4" key={label as string}>
                    <Icon size={19} className="text-[#147a91]" />
                    <span className="mt-3 block text-sm font-bold text-[#294b5c]">{label as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="bg-[#f8fcfc] py-24 lg:py-28">
            <div className="site-shell">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <div className="eyebrow">The full window, not just the pane</div>
                  <h2 className="display-font mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[.95] tracking-[-.055em] text-[#173b4f]">More Than Just Clean Glass</h2>
                </div>
                <p className="max-w-[370px] text-sm leading-6 text-[#66818b]">Mike The Window Guy focuses on the details that make a noticeable difference—from the glass itself to screens and tracks.</p>
              </div>
              <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map(({ icon: Icon, number, title, copy }) => (
                  <article className="service-card group" key={title} data-testid={`card-service-${number}`}>
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f4f7] text-[#147a91] transition-colors group-hover:bg-[#d3edf0]"><Icon size={21} /></span>
                      <span className="font-mono text-[.7rem] font-bold tracking-[.16em] text-[#9ab5bc]">{number}</span>
                    </div>
                    <h3 className="display-font mt-6 text-[1.35rem] font-bold tracking-[-.025em] text-[#173b4f]">{title}</h3>
                    <p className="mt-3 text-[.88rem] leading-6 text-[#66818b]">{copy}</p>
                    <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-[.74rem] font-bold uppercase tracking-[.1em] text-[#147a91] transition-colors hover:text-[#173b4f]" data-testid={`link-service-${number}`}>
                      Ask about this <ArrowUpRight size={14} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-[#173b4f] py-20 text-[#f7fcfd]">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_30%_50%,rgba(124,200,210,.23),transparent_65%)]" />
            <div className="site-shell relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <div className="eyebrow text-[#e9b65f]">The desert is beautiful. The dust is not.</div>
                <h2 className="display-font mt-4 max-w-[710px] text-[clamp(2.5rem,5vw,4.6rem)] font-extrabold leading-[.96] tracking-[-.055em]">Arizona Dust Doesn't Stand a Chance Against Clean Windows.</h2>
              </div>
              <div className="lg:border-l lg:border-white/15 lg:pl-10">
                <p className="text-[1rem] leading-7 text-[#c7dfe3]">Between dust storms and everyday desert dust, Arizona windows and screens can quickly lose their clarity. Professional cleaning can make a noticeable difference in how bright and clean your home looks.</p>
                <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#e9b65f] hover:text-white" data-testid="link-dust-contact">Talk about your windows <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </section>

          <section className="site-shell grid gap-12 py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-32">
            <div className="relative min-h-[360px] overflow-hidden rounded-[1.8rem] bg-[#d6edf0] p-8">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[34px] border-[#b7dfe4]" />
              <div className="absolute bottom-0 left-0 h-40 w-full bg-[#bedee0]" />
              <div className="absolute bottom-11 left-1/2 h-56 w-44 -translate-x-1/2 rounded-t-[5rem] border-x-[10px] border-t-[10px] border-white bg-[#8cc6cf]/55 shadow-[0_15px_28px_rgba(19,52,74,.12)]">
                <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 bg-white" />
                <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-white" />
              </div>
              <div className="absolute bottom-6 left-6 rounded-lg bg-white/85 px-3 py-2 text-[.67rem] font-bold uppercase tracking-[.12em] text-[#416b76]">A cleaner overall feeling</div>
            </div>
            <div>
              <div className="eyebrow">The difference customers describe</div>
              <h2 className="display-font mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[.96] tracking-[-.055em] text-[#173b4f]">More Light. Better Views. A Cleaner Home.</h2>
              <p className="mt-6 max-w-[560px] text-[1.02rem] leading-7 text-[#66818b]">Customers describe the difference as more than just clean glass—they notice brighter rooms, clearer views, and a cleaner overall feeling throughout the home.</p>
              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                {['Detail-Oriented', 'Reliable', 'Friendly & Professional', 'Affordable'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#294b5c]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7f4f7] text-[#147a91]"><Check size={14} /></span>{item}</div>
                ))}
              </div>
              <p className="mt-8 border-l-2 border-[#e9b65f] pl-4 text-xs leading-5 text-[#66818b]">One customer specifically praised Mike for standing behind his work with a one-week rain and dust guarantee.</p>
            </div>
          </section>

          <section id="reviews" className="bg-[#e9f5f6] py-24 lg:py-28">
            <div className="site-shell">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="eyebrow">Words from local customers</div>
                  <h2 className="display-font mt-4 text-[clamp(2.5rem,5vw,4.4rem)] font-extrabold leading-[.95] tracking-[-.055em] text-[#173b4f]">A clear view of the experience.</h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#577883]"><ReviewStars /> Google Review excerpts</div>
              </div>
              <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {reviews.map((review, index) => (
                  <blockquote key={review} className="mb-4 break-inside-avoid rounded-2xl border border-[#cfe4e7] bg-white p-5 shadow-[0_6px_18px_rgba(19,52,74,.045)]" data-testid={`quote-review-${index}`}>
                    <div className="flex items-center justify-between">
                      <ReviewStars />
                      <span className="text-[.62rem] font-bold uppercase tracking-[.12em] text-[#9ab5bc]">Google Review</span>
                    </div>
                    <p className="mt-5 font-[var(--app-font-serif)] text-[1.1rem] font-bold leading-6 text-[#294b5c]">“{review}”</p>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          <section id="service-area" className="site-shell grid gap-12 py-24 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:py-32">
            <div>
              <div className="eyebrow">Close to home</div>
              <h2 className="display-font mt-4 text-[clamp(2.5rem,5vw,4.3rem)] font-extrabold leading-[.95] tracking-[-.055em] text-[#173b4f]">Serving Casa Grande and surrounding Arizona communities.</h2>
              <p className="mt-6 max-w-[470px] leading-7 text-[#66818b]">Mike The Window Guy is based in Casa Grande and serves homeowners across nearby communities.</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2.5">
                {areas.map((area, index) => <span key={area} className={`rounded-full border px-4 py-2.5 text-sm font-semibold ${index === 4 ? 'border-[#147a91] bg-[#147a91] text-white' : 'border-[#c6dfe3] bg-[#f8fcfc] text-[#416b76]'}`} data-testid={`text-area-${index}`}>{area}</span>)}
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="min-w-[18.5rem] flex-1 rounded-2xl border border-[#d5e4e7] bg-[#f8fcfc] p-5">
                  <Clock3 size={20} className="text-[#147a91]" />
                  <h3 className="mt-4 font-[var(--app-font-serif)] text-lg font-bold text-[#173b4f]">Hours</h3>
                  <div className="mt-3 space-y-2 text-sm text-[#66818b]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="whitespace-nowrap">Monday–Saturday</span>
                      <strong className="whitespace-nowrap text-[#294b5c]">7:00 AM–5:00 PM</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Sunday</span>
                      <strong className="whitespace-nowrap text-[#294b5c]">Closed</strong>
                    </div>
                  </div>
                </div>
                <div className="min-w-[18.5rem] flex-1 rounded-2xl border border-[#d5e4e7] bg-[#f8fcfc] p-5">
                  <MapPin size={20} className="text-[#147a91]" />
                  <h3 className="mt-4 font-[var(--app-font-serif)] text-lg font-bold text-[#173b4f]">Based in</h3>
                  <p className="mt-3 text-sm leading-6 text-[#66818b]">Casa Grande, Arizona<br />Serving surrounding communities</p>
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="bg-white py-24 lg:py-28">
            <div className="site-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
              <div>
                <div className="eyebrow">Good questions, clear answers</div>
                <h2 className="display-font mt-4 text-[clamp(2.5rem,5vw,4.2rem)] font-extrabold leading-[.95] tracking-[-.055em] text-[#173b4f]">Before you reach out.</h2>
                <p className="mt-6 max-w-[380px] leading-7 text-[#66818b]">Not seeing your question? Tell Mike what you need cleaned and get in touch.</p>
                <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#147a91]" data-testid="link-faq-contact">Ask about your windows <ArrowUpRight size={16} /></a>
              </div>
              <div className="border-t border-[#d5e4e7]">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={faq.question} className="border-b border-[#d5e4e7]">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-5 py-5 text-left font-[var(--app-font-serif)] text-[1.02rem] font-bold text-[#294b5c]"
                        aria-expanded={isOpen}
                        data-testid={`button-faq-${index}`}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={19} className={`shrink-0 text-[#147a91] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && <p className="max-w-[680px] pb-5 pr-8 text-sm leading-6 text-[#66818b]" data-testid={`text-faq-answer-${index}`}>{faq.answer}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="contact" className="bg-[#e7f4f7] py-24 lg:py-28">
            <div className="site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
              <div>
                <div className="eyebrow">Start with a conversation</div>
                <h2 className="display-font mt-4 text-[clamp(2.8rem,5vw,4.8rem)] font-extrabold leading-[.94] tracking-[-.06em] text-[#173b4f]">Ready for Crystal-Clear Windows?</h2>
                <p className="mt-6 max-w-[470px] text-[1.02rem] leading-7 text-[#577883]">Tell Mike what you need cleaned and get in touch about your window-cleaning service.</p>
                <a href={phoneHref} className="mt-9 inline-flex items-center gap-3 text-lg font-bold text-[#147a91]" data-testid="link-contact-phone"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173b4f] text-white"><Phone size={17} /></span>520-483-3468</a>
              </div>
              <div className="rounded-[1.6rem] border border-[#c5dfe3] bg-white p-6 shadow-[0_18px_40px_rgba(19,52,74,.08)] sm:p-8">
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dff2e6] text-[#2b8560]"><Check size={29} strokeWidth={2.5} /></span>
                    <h3 className="display-font mt-7 text-3xl font-extrabold tracking-[-.04em] text-[#173b4f]">Request received.</h3>
                    <p className="mt-3 max-w-[370px] leading-7 text-[#66818b]" data-testid="status-form-success">Thank you! Your request has been received. Mike The Window Guy will be in touch.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmitError(null);
                      }}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#9bcbd0] px-5 py-2.5 text-sm font-bold text-[#147a91] hover:bg-[#e7f4f7]"
                      data-testid="button-new-request"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label><span className="field-label">Name <span className="text-[#c15b4e]">*</span></span><input className="field-control" name="name" required placeholder="Your name" data-testid="input-name" /></label>
                      <label>
                        <span className="field-label">Phone <span className="text-[#c15b4e]">*</span></span>
                        <input
                          className="field-control"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          required
                          placeholder="(520) 483-3468"
                          value={phone}
                          onChange={(event) => {
                            const next = event.target.value;
                            const isDeleting = next.length < phone.length;
                            setPhone(formatUSPhone(next, isDeleting));
                          }}
                          data-testid="input-phone"
                        />
                      </label>
                    </div>
                    <label><span className="field-label">Email <span className="font-normal text-[#8ca5ac]">(optional)</span></span><input className="field-control" name="email" type="email" placeholder="you@example.com" data-testid="input-email" /></label>
                    <label className="block pt-3"><span className="field-label">Service Needed <span className="text-[#c15b4e]">*</span></span><select className="field-control" name="service" required defaultValue="" data-testid="select-service"><option value="" disabled>Select a service</option><option>Window Cleaning</option><option>Screen Cleaning</option><option>Window Track Cleaning</option><option>Water Spot Treatment</option><option>Solar Screen Cleaning</option><option>Screen Repair</option><option>Recurring Window Cleaning</option><option>Other</option></select></label>
                    <label className="block pt-3"><span className="field-label">Message <span className="font-normal text-[#8ca5ac]">(optional)</span></span><textarea className="field-control min-h-28 resize-y" name="message" placeholder="Tell Mike a little about what you need cleaned." data-testid="textarea-message" /></label>
                    {submitError && (
                      <p className="text-center text-sm text-[#c15b4e]" data-testid="status-form-error">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#173b4f] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                      data-testid="button-submit-contact"
                    >
                      {isSubmitting ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <>
                          <Send size={16} /> Send request
                        </>
                      )}
                    </button>
                    <p className="text-center text-[.7rem] text-[#829da5]">Required fields are marked with an asterisk.</p>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#173b4f] py-12 text-[#d8eaed]">
          <div className="site-shell grid gap-10 md:grid-cols-[1.3fr_.7fr_.8fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9b65f] text-[#173b4f]"><span className="absolute inset-[7px] rounded-[5px] border-2 border-[#173b4f]" /><span className="absolute left-1/2 top-[7px] h-[24px] w-px -translate-x-1/2 bg-[#173b4f]" /><span className="absolute left-[7px] top-1/2 h-px w-[24px] -translate-y-1/2 bg-[#173b4f]" /></span>
                <span className="font-[var(--app-font-serif)] text-sm font-extrabold tracking-[.13em] text-white">MIKE THE WINDOW GUY</span>
              </div>
              <p className="mt-5 max-w-[350px] text-sm leading-6 text-[#a9c7cd]">Professional window and screen cleaning in Casa Grande and surrounding Arizona communities.</p>
            </div>
            <div>
              <div className="text-[.7rem] font-bold uppercase tracking-[.16em] text-[#e9b65f]">Explore</div>
              <div className="mt-4 grid gap-2 text-sm"><a href="#services" className="hover:text-white" data-testid="link-footer-services">Services</a><a href="#reviews" className="hover:text-white" data-testid="link-footer-reviews">Reviews</a><a href="#service-area" className="hover:text-white" data-testid="link-footer-area">Service Area</a><a href="#contact" className="hover:text-white" data-testid="link-footer-contact">Contact</a></div>
            </div>
            <div>
              <div className="text-[.7rem] font-bold uppercase tracking-[.16em] text-[#e9b65f]">Call Mike</div>
              <a href={phoneHref} className="mt-4 block text-lg font-bold text-white hover:text-[#e9b65f]" data-testid="link-footer-phone">520-483-3468</a>
              <p className="mt-2 text-sm text-[#a9c7cd]">Mon–Sat · 7:00 AM–5:00 PM</p>
            </div>
          </div>
          <div className="site-shell mt-10 border-t border-white/15 pt-5 text-[.7rem] text-[#88abb3]">© {new Date().getFullYear()} MIKE THE WINDOW GUY · Casa Grande, Arizona</div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;