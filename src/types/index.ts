// ── Navigation ───────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// ── Hero ─────────────────────────────────────────────────────────
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  cta: string;
  ctaLink: string;
}

// ── Services ─────────────────────────────────────────────────────
export interface ServiceCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

// ── Projects ─────────────────────────────────────────────────────
export interface Project {
  id: number;
  // Some UIs use `name` instead of `title` (legacy / mock data).
  title?: string;
  name?: string;
  location: string;
  description: string | null;
  image?: string;
  photo?: string;

  // Legacy UI fields.
  tag?: string;

  // Backend status field (e.g. 'active' | 'inactive').
  status?: string;

  // Category may be a simple string (used by landingData mock) OR an object (used by API).
  category?:
    | string
    | {
        id?: number;
        title: string;
      };
}







// ── Testimonials ─────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  // Fields differ between APIs/mocks (legacy vs newer).
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  badge?: string;
  // Some sections use `model` naming based on a different backend shape.
  model?: string;
  message?: string;


}





// ── Stats ────────────────────────────────────────────────────────
export interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
}

// ── Footer ───────────────────────────────────────────────────────
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

// ── Partners / Consultants ───────────────────────────────────────
export interface Partner {
  id: number;
  name: string;
  logo: string;
}

// ── News ────────────────────────────────────────────────────────
export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  date: string;
  source: string;
  href: string;
  image: string;
  category: string;
}
