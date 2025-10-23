import { 
  type Service, 
  type InsertService, 
  type News, 
  type InsertNews, 
  type CouncilMember, 
  type InsertCouncilMember,
  type ChurchInfo,
  type AboutContent
} from "@shared/schema";
import { randomUUID } from "crypto";

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
      {
        date: "24",
        month: "november",
        time: "9:00 uur",
        preacher: "Ds. T.C. Verhoef",
        location: "Hervormde Kerk Giessen-Oudekerk",
        special: "Heilig Avondmaal",
        sortOrder: 1
      },
      {
        date: "24",
        month: "november",
        time: "10:45 uur",
        preacher: "Ds. T.C. Verhoef",
        location: "Hervormde Kerk Giessen-Oudekerk",
        special: "Heilig Avondmaal",
        sortOrder: 2
      },
      {
        date: "24",
        month: "november",
        time: "18:30 uur",
        preacher: "Ds. T.C. Verhoef",
        location: "Hervormde Kerk Giessen-Oudekerk",
        special: null,
        sortOrder: 3
      },
      {
        date: "1",
        month: "december",
        time: "9:00 uur",
        preacher: "Ds. T.C. Verhoef",
        location: "Hervormde Kerk Giessen-Oudekerk",
        special: "1e Advent",
        sortOrder: 4
      },
      {
        date: "1",
        month: "december",
        time: "10:45 uur",
        preacher: "Gastspreker",
        location: "Hervormde Kerk Giessen-Oudekerk",
        special: "Doopdienst",
        sortOrder: 5
      },
      {
        date: "1",
        month: "december",
        time: "18:30 uur",
        preacher: "Ds. T.C. Verhoef",
        location: "Hervormde Kerk Giessen-Oudekerk",
        special: null,
        sortOrder: 6
      }
    ];

    servicesData.forEach(service => {
      const id = randomUUID();
      this.services.set(id, { ...service, id });
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
      this.news.set(id, { 
        ...newsItem, 
        id, 
        date: new Date()
      });
    });

    // Seed council members
    const councilData: InsertCouncilMember[] = [
      {
        name: "Ds. T.C. Verhoef",
        role: "Predikant",
        email: "t.c.verhoef@hggop.nl",
        phone: null,
        category: "Predikant",
        sortOrder: 1
      },
      {
        name: "A. de Vries",
        role: "Voorzitter",
        email: "kerkenraad@hggop.nl",
        phone: null,
        category: "Ouderlingen",
        sortOrder: 2
      },
      {
        name: "B. Jansen",
        role: "Scriba",
        email: "scriba@hggop.nl",
        phone: null,
        category: "Ouderlingen",
        sortOrder: 3
      },
      {
        name: "C. van den Berg",
        role: "Ouderling",
        email: "kerkenraad@hggop.nl",
        phone: null,
        category: "Ouderlingen",
        sortOrder: 4
      },
      {
        name: "D. Bakker",
        role: "Voorzitter Diaconie",
        email: "diaconie@hggop.nl",
        phone: null,
        category: "Diakenen",
        sortOrder: 5
      },
      {
        name: "E. Visser",
        role: "Penningmeester",
        email: "penningmeester@hggop.nl",
        phone: null,
        category: "Diakenen",
        sortOrder: 6
      }
    ];

    councilData.forEach(member => {
      const id = randomUUID();
      this.councilMembers.set(id, { ...member, id });
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
    const service: Service = { ...insertService, id };
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
      ...insertNews, 
      id, 
      date: new Date()
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
    const member: CouncilMember = { ...insertMember, id };
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
