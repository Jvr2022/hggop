import { 
  type Service, 
  type InsertService, 
  type News, 
  type InsertNews, 
  type CouncilMember, 
  type InsertCouncilMember,
  type ChurchInfo,
  type AboutContent
} from "../shared/schema";
import { randomUUID } from "node:crypto";

export interface IStorage {
  // Services
  getAllServices(): Promise<Service[]>;
  getUpcomingServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  // News
  getAllNews(): Promise<News[]>;
  getLatestNews(limit?: number): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  
  // Council Members
  getAllCouncilMembers(): Promise<CouncilMember[]>;
  createCouncilMember(member: InsertCouncilMember): Promise<CouncilMember>;
  
  // Church Info
  getChurchInfo(): Promise<ChurchInfo>;
  getAboutContent(): Promise<AboutContent>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private news: Map<string, News>;
  private councilMembers: Map<string, CouncilMember>;
  private churchInfo: ChurchInfo;
  private aboutContent: AboutContent;

  constructor() {
    this.services = new Map();
    this.news = new Map();
    this.councilMembers = new Map();
    
    // Initialize church info
    this.churchInfo = {
      name: "HGGOP",
      fullName: "Hervormde Gemeente Giessen-Oudekerk en Peursum",
      founded: "1586",
      members: 1925,
      address: "Giessen-Oudekerk",
      city: "Giessen-Oudekerk",
      postalCode: "",
      phone: "",
      email: "predikant@hggop.nl",
      youtubeChannel: "https://www.youtube.com/channel/UCAGi5k-LRMaNU1FDKARpx4A",
      facebookUrl: "https://www.facebook.com/profile.php?id=100070326722884"
    };

    // Initialize about content
    this.aboutContent = {
      identity: "Als Hervormde Gemeente Giessen-Oudekerk en Peursum hechten we aan een identiteit die bestaat uit schriftgetrouwheid en oprechtheid in belijden en handelen.",
      history: "Als Hervormde Gemeente Giessen-Oudekerk en Peursum vinden we onze oorsprong in 1586, toen na de Reformatie een protestantse gemeente werd gesticht.",
      vision: "Onze visie is gebaseerd op drie pijlers: Vieren, Getuigen en Ontmoeten.",
      safetyStatement: "De kerk is in principe een veilige plaats om te zijn. Om de gewenste sociale veiligheid helder en bespreekbaar te maken heeft de kerkenraad een eigen gedragscode opgesteld."
    };

    this.seedData();
  }

  private seedData() {
    // Seed services
    const servicesData: InsertService[] = [
      // Oktober
      { date: "26", month: "oktober", time: "9:00 uur", preacher: "Ds. R.F. de Wit, Rotterdam", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 1 },
      { date: "26", month: "oktober", time: "10:45 uur", preacher: "Ds. R.F. de Wit, Rotterdam", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 2 },
      { date: "26", month: "oktober", time: "18:30 uur", preacher: "Ds. R.F. de Wit, Rotterdam", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 3 },
      
      // November
      { date: "2", month: "november", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Jeugddienst", sortOrder: 4 },
      { date: "2", month: "november", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Jeugddienst", sortOrder: 5 },
      { date: "2", month: "november", time: "18:30 uur", preacher: "Ronny van Renswoude", location: "Hervormde Kerk Giessen-Oudekerk", special: "Jeugddienst", sortOrder: 6 },
      
      { date: "5", month: "november", time: "14:30 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Dankdag", sortOrder: 7 },
      { date: "5", month: "november", time: "19:30 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Dankdag", sortOrder: 8 },
      
      { date: "9", month: "november", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 9 },
      { date: "9", month: "november", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Doopdienst", sortOrder: 10 },
      { date: "9", month: "november", time: "18:30 uur", preacher: "Ds. C. van Velzen, Blaricum", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 11 },
      
      { date: "16", month: "november", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 12 },
      { date: "16", month: "november", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 13 },
      { date: "16", month: "november", time: "18:30 uur", preacher: "Ds. J.S. Heutink, Katwijk", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 14 },
      
      { date: "23", month: "november", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Eeuwigheidszondag", sortOrder: 15 },
      { date: "23", month: "november", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Eeuwigheidszondag", sortOrder: 16 },
      { date: "23", month: "november", time: "18:30 uur", preacher: "Ds. P.A. Verbaan, Ede", location: "Hervormde Kerk Giessen-Oudekerk", special: "Eeuwigheidszondag", sortOrder: 17 },
      
      { date: "30", month: "november", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Voorbereiding Heilig Avondmaal", sortOrder: 18 },
      { date: "30", month: "november", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Voorbereiding Heilig Avondmaal", sortOrder: 19 },
      { date: "30", month: "november", time: "18:30 uur", preacher: "Ds. M. Dubbelman, Hardinxveld-Giessendam", location: "Hervormde Kerk Giessen-Oudekerk", special: "Voorbereiding Heilig Avondmaal", sortOrder: 20 },
      
      // December
      { date: "7", month: "december", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Heilig Avondmaal", sortOrder: 21 },
      { date: "7", month: "december", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Heilig Avondmaal", sortOrder: 22 },
      { date: "7", month: "december", time: "18:30 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Heilig Avondmaal", sortOrder: 23 },
      
      { date: "14", month: "december", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 24 },
      { date: "14", month: "december", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 25 },
      { date: "14", month: "december", time: "18:30 uur", preacher: "Ds. P. Baas, Zoetermeer", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 26 },
      
      { date: "21", month: "december", time: "9:00 uur", preacher: "Dhr. M. van der Linden, Katwijk a/d Rijn", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 27 },
      { date: "21", month: "december", time: "10:45 uur", preacher: "Dhr. M. van der Linden, Katwijk a/d Rijn", location: "Hervormde Kerk Giessen-Oudekerk", special: "Kerstfeest zondagsschool", sortOrder: 28 },
      { date: "21", month: "december", time: "18:30 uur", preacher: "-", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 29 },
      
      { date: "24", month: "december", time: "21:30 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Kerstnachtdienst", sortOrder: 30 },
      
      { date: "25", month: "december", time: "9:00 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Kerst", sortOrder: 31 },
      { date: "25", month: "december", time: "10:45 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Kerst", sortOrder: 32 },
      
      { date: "28", month: "december", time: "9:00 uur", preacher: "Ds. B. Lammers, Heerde", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 33 },
      { date: "28", month: "december", time: "10:45 uur", preacher: "Ds. B. Lammers, Heerde", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 34 },
      { date: "28", month: "december", time: "18:30 uur", preacher: "Ds. B.H. Weegink, Katwijk", location: "Hervormde Kerk Giessen-Oudekerk", special: null, sortOrder: 35 },
      
      { date: "31", month: "december", time: "19:30 uur", preacher: "Ds. T.C. Verhoef", location: "Hervormde Kerk Giessen-Oudekerk", special: "Oudejaarsavond", sortOrder: 36 }
    ];

    servicesData.forEach(service => {
      const id = randomUUID();
      const withId: Service = { ...service, id } as Service;
      this.services.set(id, withId);
    });

    // Seed news
    const newsData: InsertNews[] = [
      {
        title: "Kerstdiensten 2024",
        excerpt: "Ook dit jaar organiseren we verschillende kerstdiensten. U bent van harte welkom om samen Kerst te vieren.",
        content: "Ook dit jaar organiseren we verschillende kerstdiensten. Op kerstavond (24 december) om 19:00 uur is er een sfeervol kaarslicht dienst. Op eerste kerstdag (25 december) zijn er diensten om 9:00 en 10:45 uur.\n\nU bent van harte welkom om samen met ons de geboorte van Jezus Christus te vieren. De diensten zullen zoals gebruikelijk live gestreamd worden via ons YouTube kanaal.",
        featured: 1,
        imageUrl: null
      },
      {
        title: "Wijkgemeenten Hervormde Gemeente",
        excerpt: "Ontdek de verschillende wijkgemeenten binnen onze gemeente en vind verbinding dichtbij huis.",
        content: "Onze gemeente is onderverdeeld in meerdere wijkgemeenten. Dit maakt het mogelijk om ook op lokaal niveau verbinding te maken met andere gemeenteleden.\n\nElke wijkgemeente heeft een eigen ouderling die als aanspreekpunt fungeert. Voor meer informatie over welke wijkgemeente bij u past, kunt u contact opnemen met het wijkbureau.",
        featured: 0,
        imageUrl: null
      },
      {
        title: "Collectebestemming December",
        excerpt: "In december collecteren we voor verschillende goede doelen binnen en buiten onze gemeente.",
        content: "In de maand december besteden we speciale aandacht aan verschillende goede doelen. De collecten zijn bestemd voor:\n\n- Week 1: Diaconie HGGOP\n- Week 2: Kerk in Actie - Noodhulp\n- Week 3: Onderhoud Kerkgebouw\n- Week 4: Zending & Evangelisatie\n\nUw bijdrage wordt zeer gewaardeerd en helpt ons om het verschil te maken.",
        featured: 0,
        imageUrl: null
      }
    ];

    newsData.forEach(newsItem => {
      const id = randomUUID();
      const withId: News = {
        ...newsItem,
        id,
        date: new Date(),
      } as News;
      this.news.set(id, withId);
    });

    // Seed council members
    const councilData: InsertCouncilMember[] = [
      // Predikant
      { name: "T.C. Verhoef", role: "Predikant", email: "t.c.verhoef@hggop.nl", phone: "06-39730344", category: "Predikant", sortOrder: 1 },
      
      // Kerkelijk Werker
      { name: "Ronny van Renswoude", role: "Kerkelijk werker", email: "ronny.van.renswoude@hggop.nl", phone: "06-19460035", category: "Kerkelijk Werker", sortOrder: 2 },
      
      // Ouderlingen
      { name: "W.J. Blom", role: "Ouderling ouderenwerk wijk 6 t/m 10", email: "wim.blom@hggop.nl", phone: "06-57057482", category: "Ouderlingen", sortOrder: 3 },
      { name: "A.H. den Breejen", role: "Missionair ouderling", email: "aart.den.breejen@hggop.nl", phone: "06-36315627", category: "Ouderlingen", sortOrder: 4 },
      { name: "R. de Bruin", role: "Ouderling-kerkrentmeester", email: "rene.de.bruin@hggop.nl", phone: "06-20342863", category: "Ouderlingen", sortOrder: 5 },
      { name: "M. van Dijk", role: "Ouderling-kerkrentmeester, Voorzitter", email: "riens.van.dijk@hggop.nl", phone: "06-33683832", category: "Ouderlingen", sortOrder: 6 },
      { name: "A.I.J. van Drenth", role: "Wijkouderling wijk 6", email: "jorieneke.van.drenth@hggop.nl", phone: "06-29461621", category: "Ouderlingen", sortOrder: 7 },
      { name: "H. van Eeuwijk", role: "Wijkouderling wijk 9", email: "henri.van.eeuwijk@hggop.nl", phone: "06-20482457", category: "Ouderlingen", sortOrder: 8 },
      { name: "W. Gorree", role: "Wijkouderling wijk 1", email: "wout.gorree@hggop.nl", phone: "0184-651733", category: "Ouderlingen", sortOrder: 9 },
      { name: "A.C. Hoffland", role: "Wijkouderling wijk 10", email: "andre.hoffland@hggop.nl", phone: "0184-642574", category: "Ouderlingen", sortOrder: 10 },
      { name: "W. de Jong", role: "Wijkouderling wijk 7", email: "wout.de.jong@hggop.nl", phone: "06-51287967", category: "Ouderlingen", sortOrder: 11 },
      { name: "D.T. Kon", role: "Ouderling-kerkrentmeester", email: "theo.kon@hggop.nl", phone: "06-51806890", category: "Ouderlingen", sortOrder: 12 },
      { name: "J. Lam", role: "Wijkouderling wijk 8", email: "hans.lam@hggop.nl", phone: "06-23397677", category: "Ouderlingen", sortOrder: 13 },
      { name: "J.A. Leeuwis", role: "Ouderling eredienst, Praeses", email: "joop.leeuwis@hggop.nl", phone: "0184-652211", category: "Ouderlingen", sortOrder: 14 },
      { name: "P. Prins", role: "Wijkouderling wijk 2&3", email: "pieter.prins@hggop.nl", phone: "06-53377619", category: "Ouderlingen", sortOrder: 15 },
      { name: "A. Romeijn", role: "Wijkouderling wijk 4&5", email: "aart.romeijn@hggop.nl", phone: "06-25008662", category: "Ouderlingen", sortOrder: 16 },
      { name: "L. van Wijngaarden", role: "Ouderling ouderenwerk wijk 1 t/m 5", email: "leen.van.wijngaarden@hggop.nl", phone: "06-25218978", category: "Ouderlingen", sortOrder: 17 },
      
      // Jeugdouderlingen
      { name: "A. Bouter-Breedveld", role: "Jeugdouderling", email: "adinda.bouter@hggop.nl", phone: "06-11133293", category: "Jeugdouderlingen", sortOrder: 18 },
      { name: "B.H. van Muijlwijk", role: "Jeugdouderling", email: "sebastiaan.van.muijlwijk@hggop.nl", phone: "06-10506859", category: "Jeugdouderlingen", sortOrder: 19 },
      
      // Diakenen
      { name: "E. Both", role: "Scriba, Secretaris", email: "emile.both@hggop.nl", phone: "06-57765911", category: "Diakenen", sortOrder: 20 },
      { name: "M.M. Post", role: "Jeugddiaken", email: "martin.post@hggop.nl", phone: "06-27391753", category: "Diakenen", sortOrder: 21 },
      { name: "A.M. Slagboom-Groeneveld", role: "Diaken", email: "marian.slagboom@hggop.nl", phone: "06-83240848", category: "Diakenen", sortOrder: 22 },
      { name: "C.H. Versloot", role: "Voorzitter", email: "kees.versloot@hggop.nl", phone: "06-47273610", category: "Diakenen", sortOrder: 23 },
      { name: "L.D.L.A. Visser", role: "Penningmeester", email: "lennard.visser@hggop.nl", phone: "06-39672917", category: "Diakenen", sortOrder: 24 }
    ];

    councilData.forEach(member => {
      const id = randomUUID();
      const withId: CouncilMember = { ...member, id } as CouncilMember;
      this.councilMembers.set(id, withId);
    });
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getUpcomingServices(): Promise<Service[]> {
    const all = await this.getAllServices();
    return all.slice(0, 6);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = {
      id,
      date: insertService.date,
      month: insertService.month,
      time: insertService.time,
      preacher: insertService.preacher,
      location: insertService.location ?? null,
      special: insertService.special ?? null,
      sortOrder: insertService.sortOrder ?? 0,
    };
    this.services.set(id, service);
    return service;
  }

  // News
  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getLatestNews(limit: number = 3): Promise<News[]> {
    const all = await this.getAllNews();
    return all.slice(0, limit);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = randomUUID();
    const news: News = {
      id,
      title: insertNews.title,
      excerpt: insertNews.excerpt,
      content: insertNews.content,
      date: new Date(),
      imageUrl: insertNews.imageUrl ?? null,
      featured: insertNews.featured ?? 0,
    };
    this.news.set(id, news);
    return news;
  }

  // Council Members
  async getAllCouncilMembers(): Promise<CouncilMember[]> {
    return Array.from(this.councilMembers.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }

  async createCouncilMember(insertMember: InsertCouncilMember): Promise<CouncilMember> {
    const id = randomUUID();
    const member: CouncilMember = {
      id,
      name: insertMember.name,
      role: insertMember.role,
      email: insertMember.email,
      phone: insertMember.phone ?? null,
      category: insertMember.category,
      sortOrder: insertMember.sortOrder ?? 0,
    };
    this.councilMembers.set(id, member);
    return member;
  }

  // Church Info
  async getChurchInfo(): Promise<ChurchInfo> {
    return this.churchInfo;
  }

  async getAboutContent(): Promise<AboutContent> {
    return this.aboutContent;
  }
}

export const storage = new MemStorage();
