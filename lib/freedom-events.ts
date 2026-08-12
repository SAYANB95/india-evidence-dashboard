export type FreedomEvent = {
  id: string;
  title: string;
  date: string;
  geography: string;
  classification: "Colonial violence" | "Revolutionary action" | "Execution and public memory" | "Military and worker uprising";
  record: string;
  significance: string;
  limitation: string;
  sourceTitle: string;
  sourceUrl: string;
};

export const freedomEvents: FreedomEvent[] = [
  {
    id: "jallianwala-bagh-1919",
    title: "Jallianwala Bagh massacre",
    date: "13 April 1919",
    geography: "Amritsar, Punjab",
    classification: "Colonial violence",
    record: "British Indian troops under Brigadier-General Reginald Dyer fired on an unarmed gathering inside Jallianwala Bagh. The official repository preserves Nanak Singh's eyewitness-linked account and the poem he wrote after surviving the massacre.",
    significance: "A defining record of colonial state violence and a major turning point in public opposition to British rule.",
    limitation: "Casualty totals differ across official and other historical accounts. This card does not collapse those disputed figures into one number.",
    sourceTitle: "Ministry of Culture — Nanak Singh and Jallianwala Bagh",
    sourceUrl: "https://cmsadmin.amritmahotsav.nic.in/unsung-heroes-detail.htm?164=",
  },
  {
    id: "kakori-action-1925",
    title: "Kakori train action and trial",
    date: "9 August 1925–1927",
    geography: "Kakori and Lucknow, United Provinces",
    classification: "Revolutionary action",
    record: "Members of the Hindustan Republican Association stopped a train carrying government treasury money near Kakori. The colonial prosecution led to death sentences for Ram Prasad Bismil, Ashfaqulla Khan, Rajendra Lahiri and Roshan Singh and imprisonment for others.",
    significance: "The action, investigation and executions became central to the revolutionary movement's public memory.",
    limitation: "This overview does not replace the full trial record or individual dossiers for every accused person.",
    sourceTitle: "Ministry of Culture — Ram Prasad Bismil",
    sourceUrl: "https://cmsadmin.amritmahotsav.nic.in/unsung-heroes-detail.htm?45=",
  },
  {
    id: "chittagong-armoury-raid-1930",
    title: "Chittagong Armoury Raid",
    date: "18 April 1930",
    geography: "Chittagong, undivided Bengal",
    classification: "Revolutionary action",
    record: "A revolutionary group led by Surya Sen attacked colonial armouries and communications and proclaimed a provisional revolutionary government in Chittagong.",
    significance: "The operation connected organised armed resistance with a broad network that included women and young participants.",
    limitation: "Chittagong is in present-day Bangladesh. The official event page is an entry point; every named participant requires a separate evidence chain.",
    sourceTitle: "Ministry of Culture — Chittagong Armoury Raid",
    sourceUrl: "https://amritmahotsav.nic.in/district-reopsitory-detail.htm?2556=",
  },
  {
    id: "writers-building-1930",
    title: "Writers' Building attack",
    date: "8 December 1930",
    geography: "Kolkata, Bengal Presidency",
    classification: "Revolutionary action",
    record: "Benoy Krishna Basu, Badal Gupta and Dinesh Chandra Gupta entered Writers' Building and attacked N. S. Simpson, the Inspector General of Prisons, before a gun battle with colonial police.",
    significance: "The episode is remembered for resistance to documented brutality in the colonial prison system and for the deaths and execution that followed.",
    limitation: "Remembering the three participants does not remove the need to document victims, trial proceedings and the surrounding political organisation.",
    sourceTitle: "Ministry of Culture — Benoy, Badal and Dinesh",
    sourceUrl: "https://amritmahotsav.nic.in/unsung-heroes-detail.htm?11063=",
  },
  {
    id: "lahore-executions-1931",
    title: "Execution of Bhagat Singh, Rajguru and Sukhdev",
    date: "23 March 1931",
    geography: "Lahore Central Jail, undivided Punjab",
    classification: "Execution and public memory",
    record: "Bhagat Singh, Shivaram Hari Rajguru and Sukhdev Thapar were executed by the colonial government in the Lahore Conspiracy Case.",
    significance: "Their trial, writings and execution became enduring symbols of revolutionary anti-colonial resistance across India.",
    limitation: "A commemorative government publication establishes the public record summarized here; a complete dossier must separately index court papers, prison writings and contemporary reporting.",
    sourceTitle: "Press Information Bureau — New India Samachar, March 2025",
    sourceUrl: "https://newindiasamachar.pib.gov.in/WriteReadData/Magazine/2025/Mar/M202503161.pdf",
  },
  {
    id: "royal-indian-navy-uprising-1946",
    title: "Royal Indian Navy uprising",
    date: "18–23 February 1946",
    geography: "Bombay and other naval establishments",
    classification: "Military and worker uprising",
    record: "Indian naval ratings began a strike that expanded across ships and shore establishments, while workers and civilians mobilised in support in Bombay and elsewhere.",
    significance: "The uprising exposed discontent inside the colonial armed forces shortly before independence and remains central to debates about the end of British rule.",
    limitation: "Participation, casualties and political influence require establishment-level and city-level records; this card does not claim one event alone caused independence.",
    sourceTitle: "Ministry of Culture — Royal Indian Navy Mutiny",
    sourceUrl: "https://cmsadmin.amritmahotsav.nic.in/district-reopsitory-detail.htm?25150=",
  },
];
