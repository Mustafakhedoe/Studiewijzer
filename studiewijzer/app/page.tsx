"use client";

import React, { useMemo, useState } from "react";

import {

  ArrowLeft,

  ArrowRight,

  BookOpen,

  GraduationCap,

  Home,

  Info,

  Mail,

  MapPin,

  MessageCircle,

  Phone,

  RefreshCcw,

  Sparkles,

  Target,

  Users,

} from "lucide-react";

type Study = {
  id: number;
  title: string;
  school: string;
  city: string;
  match: string[];
};

type QuestionOption = {
  value: string;
  label: string;
};

type Question = {
  id: number;
  key: string;
  title: string;
  options: QuestionOption[];
};

type Answers = Record<string, string>;

type QuestionCardProps = {
  question: Question;
  selected?: string;
  onSelect: (key: string, value: string) => void;
};
 
const studies: Study[] = [

  { id: 1, title: "HBO-ICT", school: "De Haagse Hogeschool", city: "Den Haag", match: ["ict", "software", "code", "logica", "praktisch", "tech", "ontwikkelen", "apps"] },

  { id: 2, title: "Software Engineering", school: "Fontys Hogeschool", city: "Eindhoven", match: ["ict", "software", "code", "apps", "logica", "ontwikkelen", "tech"] },

  { id: 3, title: "Creative Media and Game Technologies", school: "BUas", city: "Breda", match: ["games", "design", "creatief", "software", "ontwerpen", "gamedev"] },

  { id: 4, title: "Werktuigbouwkunde", school: "Hogeschool Utrecht", city: "Utrecht", match: ["techniek", "machines", "bouwen", "praktisch", "robots", "tech"] },

  { id: 5, title: "Built Environment", school: "HAN", city: "Arnhem", match: ["bouwen", "producten", "techniek", "ontwerpen", "praktisch"] },

  { id: 6, title: "Commerciële Economie", school: "Hogeschool Rotterdam", city: "Rotterdam", match: ["marketing", "business", "ondernemen", "presenteren", "bedrijven", "managen"] },

  { id: 7, title: "Finance & Control", school: "Avans Hogeschool", city: "Breda", match: ["analyseren", "logica", "business", "bedrijven", "geld"] },

  { id: 8, title: "Communicatie", school: "Windesheim", city: "Zwolle", match: ["creatief", "presenteren", "marketing", "mensen", "business"] },

  { id: 9, title: "Verpleegkunde", school: "Fontys Hogeschool", city: "Eindhoven", match: ["zorg", "helpen", "mensen", "impact", "ziekenhuis"] },

  { id: 10, title: "Toegepaste Psychologie", school: "Saxion", city: "Enschede", match: ["mensen", "sociaal", "onderzoek", "helpen", "impact"] },

  { id: 11, title: "Leraar Basisonderwijs (PABO)", school: "Inholland", city: "Amsterdam", match: ["mensen", "school", "sociaal", "presenteren", "impact"] },

  { id: 12, title: "Logistics Engineering", school: "HZ University", city: "Vlissingen", match: ["techniek", "analyseren", "logica", "bedrijven", "praktisch"] },

  { id: 13, title: "Integrale Veiligheidskunde", school: "NHL Stenden", city: "Leeuwarden", match: ["mensen", "analyseren", "business", "impact", "logica"] },

  { id: 14, title: "Luchtvaarttechnologie", school: "HvA", city: "Amsterdam", match: ["techniek", "machines", "robots", "tech", "bouwen"] },

  { id: 15, title: "Industrieel Product Ontwerpen", school: "De Haagse Hogeschool", city: "Den Haag", match: ["design", "producten", "ontwerpen", "creatief", "praktisch"] },

  { id: 16, title: "Bedrijfskunde", school: "Hanzehogeschool", city: "Groningen", match: ["business", "bedrijven", "managen", "ondernemen", "analyseren"] },

];
 
const questions: Question[] = [

  {

    id: 1,

    key: "q1",

    title: "Wat vind jij het leukste op school?",

    options: [

      { value: "ict", label: "Programmeren / ICT" },

      { value: "techniek", label: "Techniek of natuurkunde" },

      { value: "creatief", label: "Creatieve vakken" },

      { value: "mensen", label: "Samenwerken met mensen" },

    ],

  },

  {

    id: 2,

    key: "q2",

    title: "Werk jij liever met…",

    options: [

      { value: "software", label: "Computers" },

      { value: "machines", label: "Machines" },

      { value: "design", label: "Design" },

      { value: "mensen", label: "Mensen" },

    ],

  },

  {

    id: 3,

    key: "q3",

    title: "Wat lijkt jou leuker?",

    options: [

      { value: "bouwen", label: "Iets bouwen" },

      { value: "analyseren", label: "Data analyseren" },

      { value: "helpen", label: "Mensen helpen" },

      { value: "ondernemen", label: "Een bedrijf starten" },

    ],

  },

  {

    id: 4,

    key: "q4",

    title: "Werk je liever…",

    options: [

      { value: "team", label: "In een team" },

      { value: "solo", label: "Alleen" },

      { value: "mix", label: "Beide" },

    ],

  },

  {

    id: 5,

    key: "q5",

    title: "Wat voor projecten spreken jou aan?",

    options: [

      { value: "apps", label: "Apps bouwen" },

      { value: "producten", label: "Producten ontwerpen" },

      { value: "zorg", label: "Zorgprojecten" },

      { value: "marketing", label: "Marketing campagnes" },

    ],

  },

  {

    id: 6,

    key: "q6",

    title: "Welke omgeving lijkt jou leuk?",

    options: [

      { value: "techbedrijf", label: "Tech bedrijf" },

      { value: "ziekenhuis", label: "Ziekenhuis" },

      { value: "bureau", label: "Marketing bureau" },

      { value: "school", label: "School" },

    ],

  },

  {

    id: 7,

    key: "q7",

    title: "Wat doe je liever?",

    options: [

      { value: "code", label: "Code schrijven" },

      { value: "ontwerpen", label: "Ontwerpen" },

      { value: "presenteren", label: "Presenteren" },

      { value: "onderzoek", label: "Onderzoek doen" },

    ],

  },

  {

    id: 8,

    key: "q8",

    title: "Waar ben je goed in?",

    options: [

      { value: "logica", label: "Logisch denken" },

      { value: "creatief", label: "Creatief denken" },

      { value: "sociaal", label: "Sociaal" },

    ],

  },

  {

    id: 9,

    key: "q9",

    title: "Wat motiveert jou?",

    options: [

      { value: "geld", label: "Goed verdienen" },

      { value: "impact", label: "Mensen helpen" },

      { value: "innovatie", label: "Nieuwe dingen maken" },

    ],

  },

  {

    id: 10,

    key: "q10",

    title: "Wat lijkt jou interessant?",

    options: [

      { value: "ai", label: "AI" },

      { value: "games", label: "Games" },

      { value: "zorg", label: "Zorg" },

    ],

  },

  {

    id: 11,

    key: "q11",

    title: "Wat doe je in je vrije tijd?",

    options: [

      { value: "gamedev", label: "Games" },

      { value: "sport", label: "Sport" },

      { value: "bouwen", label: "Dingen bouwen" },

    ],

  },

  {

    id: 12,

    key: "q12",

    title: "Hoe werk jij het liefst?",

    options: [

      { value: "praktisch", label: "Praktisch" },

      { value: "theorie", label: "Theorie" },

    ],

  },

  {

    id: 13,

    key: "q13",

    title: "Wat lijkt jou leuk?",

    options: [

      { value: "robots", label: "Robots" },

      { value: "bedrijven", label: "Bedrijven" },

      { value: "mensen", label: "Mensen" },

    ],

  },

  {

    id: 14,

    key: "q14",

    title: "Welke sector spreekt jou aan?",

    options: [

      { value: "tech", label: "Tech" },

      { value: "zorg", label: "Zorg" },

      { value: "business", label: "Business" },

    ],

  },

  {

    id: 15,

    key: "q15",

    title: "Wat wil je later doen?",

    options: [

      { value: "ontwikkelen", label: "Software maken" },

      { value: "ontwerpen", label: "Producten ontwerpen" },

      { value: "managen", label: "Bedrijven managen" },

    ],

  },

];
 
function cx(...classes: string[]) {

  return classes.filter(Boolean).join(" ");

}

type ButtonProps = React.PropsWithChildren<{
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
}> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "type">;

type CardProps = React.PropsWithChildren<{
  className?: string;
}>;

type BadgeProps = React.PropsWithChildren<{
  className?: string;
}>;
 
function Button({

  children,

  className = "",

  variant = "default",

  type = "button",

  ...props

}: ButtonProps) {

  const variants = {

    default: "bg-slate-900 text-white hover:bg-slate-800",

    secondary: "bg-white text-slate-900 hover:bg-slate-100",

    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",

    ghost: "bg-transparent text-slate-900 hover:bg-slate-100",

  };
 
  return (
<button

      type={type}

      className={cx(

        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",

        variants[variant] || variants.default,

        className

      )}

      {...props}
>

      {children}
</button>

  );

}
 
function Card({ children, className = "" }: CardProps) {

  return <div className={cx("rounded-3xl bg-white shadow-sm", className)}>{children}</div>;

}
 
function Badge({ children, className = "" }: BadgeProps) {

  return (
<span

      className={cx(

        "inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white",

        className

      )}
>

      {children}
</span>

  );

}
 
function ProgressBar({ value = 0 }) {

  const safeValue = Math.max(0, Math.min(100, value));
 
  return (
<div className="h-3 w-40 overflow-hidden rounded-full bg-sky-100">
<div

        className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-600 transition-all"

        style={{ width: `${safeValue}%` }}

      />
</div>

  );

}
 
function QuestionCard({ question, selected, onSelect }: QuestionCardProps) {

  return (
<Card className="border border-sky-100 bg-white/90 p-6 shadow-lg shadow-cyan-100/40 md:p-8">
<h3 className="mb-6 text-2xl font-bold text-slate-800">{question.title}</h3>
<div className="grid gap-3 md:grid-cols-2">

        {question.options.map((option) => (
<button

            key={option.value}

            type="button"

            onClick={() => onSelect(question.key, option.value)}

            className={cx(

              "rounded-2xl border p-4 text-left text-slate-700 transition",

              selected === option.value

                ? "border-cyan-500 bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-md"

                : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50"

            )}
>

            {option.label}
</button>

        ))}
</div>
</Card>

  );

}
 
export default function HBOStudiewijzer() {

  const [page, setPage] = useState("home");

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<Answers>({});
 
  const currentQuestion = questions[step];

  const quizDone = step >= questions.length;
 
  const scoredStudies = useMemo(() => {

    const answerValues = Object.values(answers);
 
    return studies

      .map((study) => {

        let score = 0;
 
        answerValues.forEach((answer) => {

          if (study.match.includes(answer)) score += 20;

        });
 
        return { ...study, score };

      })

      .sort((a, b) => b.score - a.score);

  }, [answers]);
 
  const selectAnswer = (key: string, value: string) => {

    setAnswers((prev) => ({ ...prev, [key]: value }));

  };
 
  const startQuiz = () => {

    setAnswers({});

    setStep(0);

    setPage("quiz");

  };
 
  const restartQuiz = () => {

    setAnswers({});

    setStep(0);

    setPage("quiz");

  };
 
  const canContinue = currentQuestion ? !!answers[currentQuestion.key] : false;

  const progressValue = quizDone ? 100 : ((step + 1) / questions.length) * 100;
 
  return (
<div className="min-h-screen bg-slate-100 text-slate-900">
<header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
<button type="button" onClick={() => setPage("home")} className="flex items-center gap-3 text-left">
<div className="rounded-2xl bg-slate-900 p-2 text-white">
<GraduationCap className="h-5 w-5" />
</div>
<div>
<div className="text-sm font-semibold">HBO Studie Wijzer</div>
<div className="text-xs text-slate-500">Nederland</div>
</div>
</button>
 
          <div className="flex items-center gap-2">
<Button variant={page === "home" ? "default" : "ghost"} onClick={() => setPage("home")}>
<Home className="h-4 w-4" /> Home
</Button>
<Button variant={page === "about" ? "default" : "ghost"} onClick={() => setPage("about")}>
<Info className="h-4 w-4" /> About us
</Button>
<Button onClick={startQuiz}>Start quiz</Button>
</div>
</div>
</header>
 
      {page === "home" && (
<main className="mx-auto max-w-6xl p-6 md:p-10">
<section className="overflow-hidden rounded-4xl bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-14 text-white shadow-2xl md:px-12 md:py-20">
<div className="grid items-center gap-10 lg:grid-cols-2">
<div>
<Badge className="mb-4 bg-white/10 text-white">HBO Studie Wijzer Nederland</Badge>
<h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">

                  Ontdek welke hbo-opleiding het beste bij jou past.
</h1>
<p className="mb-6 max-w-2xl text-base text-slate-300 md:text-lg">

                  Doe de quiz met 15 vragen en krijg direct jouw top 3 beste hbo-opleidingen op basis van jouw interesses, manier van werken en toekomstplannen.
</p>
<div className="mb-8 flex flex-wrap gap-3">
<Button className="px-6 py-3" onClick={startQuiz}>

                    Start quiz <ArrowRight className="h-4 w-4" />
</Button>
<Button variant="secondary" className="px-6 py-3" onClick={() => setPage("about")}>

                    Meer over ons
</Button>
</div>
 
                <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
<div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
<div className="text-3xl font-bold">15</div>
<div className="text-sm text-slate-200">Gerichte quizvragen</div>
</div>
<div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
<div className="text-3xl font-bold">Top 3</div>
<div className="text-sm text-slate-200">Beste matches</div>
</div>
<div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
<div className="text-3xl font-bold">Snel</div>
<div className="text-sm text-slate-200">Direct je uitslag</div>
</div>
</div>
</div>
 
              <div className="grid gap-4 sm:grid-cols-2">
<Card className="border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur">
<div className="mb-3 flex items-center gap-2 text-lg font-semibold">
<Sparkles className="h-5 w-5" /> Wat je krijgt
</div>
<p className="text-sm text-slate-200">

                    Een simpele, moderne studiekeuze tool die je helpt sneller een richting te vinden die echt bij je past.
</p>
</Card>
<Card className="border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur">
<div className="mb-3 flex items-center gap-2 text-lg font-semibold">
<Target className="h-5 w-5" /> Focus
</div>
<p className="text-sm text-slate-200">

                    De quiz kijkt naar interesse, werkstijl en voorkeuren om opleidingen slimmer te rangschikken.
</p>
</Card>
<Card className="border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur sm:col-span-2">
<div className="grid gap-3 text-sm text-slate-200 md:grid-cols-3">
<div className="rounded-2xl bg-white/10 p-4">Persoonlijke uitslag op basis van jouw antwoorden</div>
<div className="rounded-2xl bg-white/10 p-4">Duidelijke top 3 met school en stad</div>
<div className="rounded-2xl bg-white/10 p-4">Makkelijk opnieuw te doen of aan te passen</div>
</div>
</Card>
</div>
</div>
</section>
 
          <section className="mt-10 grid gap-6 md:grid-cols-3">
<Card className="p-6">
<h3 className="mb-2 text-lg font-semibold">1. Beantwoord de vragen</h3>
<p className="text-sm text-slate-600">Kies per vraag het antwoord dat het best bij jou past. De quiz is snel en duidelijk opgezet.</p>
</Card>
<Card className="p-6">
<h3 className="mb-2 text-lg font-semibold">2. Wij berekenen je match</h3>
<p className="text-sm text-slate-600">De tool vergelijkt jouw antwoorden met passende studierichtingen en zet de beste matches bovenaan.</p>
</Card>
<Card className="p-6">
<h3 className="mb-2 text-lg font-semibold">3. Zie jouw top 3</h3>
<p className="text-sm text-slate-600">Je krijgt direct de drie opleidingen die het beste aansluiten op jouw profiel en interesses.</p>
</Card>
</section>
 
          <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
<Card className="p-6">
<div className="mb-4 flex items-center gap-2 text-xl font-semibold">
<BookOpen className="h-5 w-5" /> Waarom deze studiewijzer handig is
</div>
<div className="grid gap-4 md:grid-cols-2">
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Snelle oriëntatie</h4>
<p className="text-sm text-slate-600">Ideaal als je nog twijfelt tussen meerdere richtingen en eerst een duidelijk startpunt wilt hebben.</p>
</div>
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Geen overload</h4>
<p className="text-sm text-slate-600">In plaats van meteen honderden opleidingen te tonen, krijg je eerst een heldere, persoonlijke selectie.</p>
</div>
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Gebouwd voor overzicht</h4>
<p className="text-sm text-slate-600">De site laat per match snel zien welke school, stad en richting bij de opleiding horen.</p>
</div>
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Makkelijk opnieuw te doen</h4>
<p className="text-sm text-slate-600">Twijfel je tussen twee kanten? Dan kun je de quiz opnieuw invullen en verschillende resultaten vergelijken.</p>
</div>
</div>
</Card>
 
            <Card className="p-6">
<div className="mb-4 flex items-center gap-2 text-xl font-semibold">
<Users className="h-5 w-5" /> Voor wie is dit?
</div>
<div className="space-y-4 text-sm text-slate-600">
<div className="rounded-2xl bg-slate-50 p-4">Voor scholieren die nog geen duidelijke studiekeuze hebben gemaakt.</div>
<div className="rounded-2xl bg-slate-50 p-4">Voor mbo-studenten die willen doorstromen naar het hbo.</div>
<div className="rounded-2xl bg-slate-50 p-4">Voor iedereen die een snelle en moderne eerste studiekeuze-check wil doen.</div>
<Button className="w-full" onClick={startQuiz}>Doe direct de quiz</Button>
</div>
</Card>
</section>
</main>

      )}
 
      {page === "about" && (
<main className="mx-auto max-w-6xl p-6 md:p-10">
<section className="rounded-4xl bg-white p-8 shadow-sm md:p-12">
<Badge className="mb-4">About us</Badge>
<h1 className="mb-4 text-4xl font-bold md:text-5xl">Over HBO Studie Wijzer</h1>
<p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">

              HBO Studie Wijzer is gemaakt om studiekiezers op een simpele en moderne manier te helpen bij het vinden van een passende hbo-opleiding. In plaats van direct te verdwalen in grote lijsten met opleidingen, begin je hier met een quiz die jouw interesses en voorkeuren omzet in duidelijke matches.
</p>
</section>
 
          <section className="mt-8 grid gap-6 lg:grid-cols-3">
<Card className="p-6 lg:col-span-2">
<div className="mb-4 flex items-center gap-2 text-xl font-semibold">
<MessageCircle className="h-5 w-5" /> Onze missie
</div>
<div className="grid gap-4 md:grid-cols-2">
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Duidelijkheid geven</h4>
<p className="text-sm text-slate-600">Wij willen studiekeuze minder verwarrend maken door complexe informatie terug te brengen naar een logische eerste stap.</p>
</div>
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Betere start</h4>
<p className="text-sm text-slate-600">De site helpt gebruikers sneller richting te kiezen, zodat ze daarna gerichter opleidingen kunnen vergelijken.</p>
</div>
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Toegankelijk voor iedereen</h4>
<p className="text-sm text-slate-600">Een overzichtelijke quiz en simpele interface maken de site makkelijk te gebruiken voor veel verschillende studenten.</p>
</div>
<div className="rounded-2xl bg-slate-50 p-5">
<h4 className="mb-2 font-semibold">Modern en praktisch</h4>
<p className="text-sm text-slate-600">Geen moeilijke teksten, maar een directe aanpak met bruikbare resultaten en een duidelijke top 3.</p>
</div>
</div>
</Card>
 
            <Card className="p-6">
<div className="mb-4 flex items-center gap-2 text-xl font-semibold">
<Users className="h-5 w-5" /> Team
</div>
<div className="space-y-3 text-sm text-slate-600">
<div className="rounded-2xl bg-slate-50 p-4">Mustafa Khedoe Full Stack Developer</div>
<div className="rounded-2xl bg-slate-50 p-4">Leonard Zuiderwijk Back-end</div>
<div className="rounded-2xl bg-slate-50 p-4">Kaya Gerling UX Design</div>
</div>
</Card>
</section>
 
          <section className="mt-8 grid gap-6 md:grid-cols-2">
<Card className="p-6">
<h3 className="mb-4 text-xl font-semibold">Contacten</h3>
<div className="space-y-4 text-sm text-slate-600">
<div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
<Mail className="h-5 w-5 text-slate-900" />
<div>
<div className="font-medium text-slate-900">E-mail</div>
<div>info@hbostudiewijzer.nl</div>
</div>
</div>
<div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
<Phone className="h-5 w-5 text-slate-900" />
<div>
<div className="font-medium text-slate-900">Telefoon</div>
<div>+31 70 123 45 67</div>
</div>
</div>
<div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
<MapPin className="h-5 w-5 text-slate-900" />
<div>
<div className="font-medium text-slate-900">Adres</div>
<div>Den Haag, Nederland</div>
</div>
</div>
</div>
</Card>
 
            <Card className="p-6">
<h3 className="mb-4 text-xl font-semibold">Stuur ons een bericht</h3>
<div className="space-y-4">
<input className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none" placeholder="Jouw naam" />
<input className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none" placeholder="Jouw e-mail" />
<textarea className="min-h-35 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Jouw bericht" />
<Button className="w-full">Verstuur bericht</Button>
</div>
</Card>
</section>
</main>

      )}
 
      {page === "quiz" && (
    <main className="mx-auto max-w-5xl rounded-4xl border border-sky-100 bg-linear-to-br from-white via-sky-50/70 to-cyan-50/70 p-6 shadow-sm md:p-8">
    <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl bg-white/80 p-4">
<div>
    <h2 className="text-2xl font-bold text-slate-800">Studiekeuze Quiz</h2>
    <p className="text-sm text-slate-600">Beantwoord alle 15 vragen voor je uitslag</p>
</div>
<ProgressBar value={progressValue} />
</div>
 
          {!quizDone ? (
<div>
<QuestionCard

                question={currentQuestion}

                selected={answers[currentQuestion.key]}

                onSelect={selectAnswer}

              />
 
              <div className="mt-6 flex justify-between">
<Button

                  variant="outline"

                  className="border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50"

                  onClick={() => (step === 0 ? setPage("home") : setStep((s) => s - 1))}
>
<ArrowLeft className="h-4 w-4" /> {step === 0 ? "Home" : "Vorige"}
</Button>
 
                <Button className="bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700" disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>

                  Volgende <ArrowRight className="h-4 w-4" />
</Button>
</div>
</div>

          ) : (
<div>
<div className="mb-6 flex items-center justify-between gap-4">
<h3 className="text-3xl font-bold text-slate-800">Beste opleidingen voor jou</h3>
<Button variant="outline" className="border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50" onClick={() => setPage("home")}>Terug naar home</Button>
</div>
 
              <div className="grid gap-4 md:grid-cols-2">

                {scoredStudies.slice(0, 3).map((study, index) => (
<Card key={study.id} className="border border-sky-100 bg-white/95 p-5 shadow-md shadow-cyan-100/40">
<div className="mb-3 flex items-center justify-between">
<Badge className="bg-cyan-600">#{index + 1} Match</Badge>
<span className="text-sm font-semibold text-slate-500">{study.score} pt</span>
</div>
<h4 className="text-lg font-semibold">{study.title}</h4>
<p className="text-sm text-slate-600">{study.school}</p>
<p className="mt-1 text-sm text-slate-500">{study.city}</p>
</Card>

                ))}
</div>
 
              <div className="mt-6 flex gap-3">
<Button className="bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700" onClick={restartQuiz}>
<RefreshCcw className="h-4 w-4" /> Opnieuw doen
</Button>
<Button variant="outline" className="border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50" onClick={() => setPage("home")}>Home</Button>
</div>
</div>

          )}
</main>

      )}
</div>

  );

}

 