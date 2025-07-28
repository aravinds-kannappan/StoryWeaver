import { Genre } from "@/components/GenreSelector";
import { Theme } from "@/components/ThemeSelector";

interface StoryOutline {
  title: string;
  premise: string;
  mainCharacter: string;
  conflict: string;
  plotPoints: string[];
  themes: string[];
  tone: string;
}

// Mock story templates for different genre combinations
const storyTemplates = {
  Fantasy: {
    characters: ["A young mage discovering their power", "An exiled dragon rider", "A merchant with magical artifacts", "A warrior from a fallen kingdom"],
    conflicts: ["An ancient evil awakens", "Magic is disappearing from the world", "A prophecy must be fulfilled", "Kingdoms are at war over magical resources"],
    plotElements: ["A magical artifact is discovered", "A mentor is lost", "A hidden truth is revealed", "A great sacrifice must be made", "Powers are awakened"]
  },
  "Sci-Fi": {
    characters: ["A space station engineer", "An AI researcher", "A rebel pilot", "A time traveler"],
    conflicts: ["Humanity faces extinction", "AI has become sentient", "A new planet must be colonized", "Time paradoxes threaten reality"],
    plotElements: ["Technology fails at crucial moment", "Contact with alien life", "Discovery of conspiracy", "Journey to unknown world", "Evolution of consciousness"]
  },
  Mystery: {
    characters: ["A detective with a dark past", "A forensic scientist", "A private investigator", "A journalist"],
    conflicts: ["A serial killer strikes again", "A cold case resurfaces", "Corporate secrets must be exposed", "A missing person case turns deadly"],
    plotElements: ["A crucial clue is found", "The prime suspect has an alibi", "A witness disappears", "Evidence is destroyed", "The truth is revealed"]
  },
  Romance: {
    characters: ["A wedding planner", "A single parent", "A travel writer", "A small town doctor"],
    conflicts: ["Past relationships interfere", "Career ambitions clash", "Family disapproval", "Distance separates lovers"],
    plotElements: ["An unexpected meeting", "A misunderstanding occurs", "A grand gesture", "Support during crisis", "Declaration of love"]
  },
  Horror: {
    characters: ["A paranormal investigator", "A family moving to a new home", "A group of friends on vacation", "A night shift worker"],
    conflicts: ["Ancient curse awakens", "Supernatural entity haunts", "Psychological terror unfolds", "Survival against unknown threat"],
    plotElements: ["Strange occurrences begin", "First victim appears", "Truth about evil is discovered", "Final confrontation", "Escape or sacrifice"]
  }
};

const themeElements = {
  Love: ["Finding connection", "Unconditional acceptance", "Love conquers all"],
  Betrayal: ["Trust is broken", "Hidden agendas revealed", "Loyalty tested"],
  Redemption: ["Second chances", "Making amends", "Overcoming past mistakes"],
  Power: ["Corruption of authority", "Struggle for control", "Responsibility of leadership"],
  Sacrifice: ["Personal cost for greater good", "Difficult choices", "Noble suffering"],
  Discovery: ["Hidden truths", "Self-revelation", "New worlds unveiled"],
  Revenge: ["Justice through retribution", "Cycle of violence", "Price of vengeance"],
  Hope: ["Light in darkness", "Perseverance through hardship", "Belief in better future"],
  Loss: ["Grief and healing", "What remains after tragedy", "Learning to let go"],
  Transformation: ["Personal growth", "Change through adversity", "Evolution of character"]
};

// Outline Agent - Generates initial story structure
export class OutlineAgent {
  static async generateOutline(genres: Genre[], themes: Theme[]): Promise<StoryOutline> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const primaryGenre = genres[0] || "Fantasy";
    const template = storyTemplates[primaryGenre as keyof typeof storyTemplates] || storyTemplates.Fantasy;
    
    const title = this.generateTitle(genres, themes);
    const character = template.characters[Math.floor(Math.random() * template.characters.length)];
    const conflict = template.conflicts[Math.floor(Math.random() * template.conflicts.length)];
    
    const plotPoints = this.generatePlotPoints(template.plotElements, themes);
    const premise = this.generatePremise(character, conflict, themes);
    const tone = this.determineTone(genres);
    
    return {
      title,
      premise,
      mainCharacter: character,
      conflict,
      plotPoints,
      themes: themes.slice(0, 3), // Use up to 3 themes
      tone
    };
  }
  
  private static generateTitle(genres: Genre[], themes: Theme[]): string {
    const titleWords = [
      "The", "Shadow", "Light", "Crown", "Heart", "Song", "Blade", "Storm", "Fire", "Moon",
      "Echo", "Dream", "Whisper", "Dance", "Tears", "Blood", "Silver", "Golden", "Crimson", "Eternal"
    ];
    
    const genreWords = {
      Fantasy: ["Dragon", "Magic", "Realm", "Enchanted", "Mystic"],
      "Sci-Fi": ["Star", "Quantum", "Nebula", "Cosmic", "Infinite"],
      Mystery: ["Secret", "Hidden", "Silent", "Midnight", "Vanished"],
      Romance: ["Beloved", "Passion", "Promise", "Forever", "Devotion"],
      Horror: ["Nightmare", "Cursed", "Haunted", "Terror", "Darkness"]
    };
    
    const themeWords = themes.slice(0, 2).join(" ");
    const genre = genres[0] || "Fantasy";
    const genreSpecific = genreWords[genre as keyof typeof genreWords] || genreWords.Fantasy;
    
    const word1 = titleWords[Math.floor(Math.random() * titleWords.length)];
    const word2 = genreSpecific[Math.floor(Math.random() * genreSpecific.length)];
    
    return `${word1} ${word2}`;
  }
  
  private static generatePremise(character: string, conflict: string, themes: Theme[]): string {
    const themeElements_sample = themes.slice(0, 2).map(theme => 
      themeElements[theme as keyof typeof themeElements]?.[0] || ""
    ).filter(Boolean);
    
    return `${character} must face ${conflict.toLowerCase()}. Through their journey, they will discover the true meaning of ${themeElements_sample.join(" and ")}, ultimately learning that courage comes not from the absence of fear, but from acting despite it.`;
  }
  
  private static generatePlotPoints(elements: string[], themes: Theme[]): string[] {
    const shuffled = [...elements].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);
    
    // Add theme-specific plot points
    themes.forEach(theme => {
      const themeElement = themeElements[theme as keyof typeof themeElements];
      if (themeElement && selected.length < 5) {
        selected.push(`Character experiences ${themeElement[0].toLowerCase()}`);
      }
    });
    
    return selected.slice(0, 5);
  }
  
  private static determineTone(genres: Genre[]): string {
    const tones = {
      Fantasy: "Epic and Wonder-filled",
      "Sci-Fi": "Thought-provoking and Futuristic", 
      Mystery: "Suspenseful and Intriguing",
      Romance: "Emotional and Heartwarming",
      Horror: "Dark and Atmospheric",
      Adventure: "Exciting and Bold",
      Thriller: "Intense and Fast-paced",
      Historical: "Rich and Immersive"
    };
    
    return tones[genres[0] as keyof typeof tones] || "Dramatic and Engaging";
  }
}

// Refinement Agent - Enhances the story with character depth and plot twists
export class RefinementAgent {
  static async refineOutline(originalOutline: StoryOutline): Promise<StoryOutline> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
    
    const refinedCharacter = this.addCharacterDepth(originalOutline.mainCharacter);
    const enhancedConflict = this.addComplexity(originalOutline.conflict);
    const twistedPlotPoints = this.addPlotTwists(originalOutline.plotPoints);
    const deeperPremise = this.enhancePremise(originalOutline.premise);
    
    return {
      ...originalOutline,
      mainCharacter: refinedCharacter,
      conflict: enhancedConflict,
      premise: deeperPremise,
      plotPoints: twistedPlotPoints,
      title: originalOutline.title + ": Refined",
    };
  }
  
  private static addCharacterDepth(character: string): string {
    const backgrounds = [
      "who struggles with self-doubt despite their abilities",
      "haunted by a tragic past that shaped their worldview",
      "torn between loyalty to family and personal ambitions",
      "hiding a secret that could change everything",
      "whose greatest strength is also their greatest weakness"
    ];
    
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    return `${character} ${background}`;
  }
  
  private static addComplexity(conflict: string): string {
    const complications = [
      "but the true enemy may be someone they trust",
      "while dealing with internal struggles that mirror the external threat",
      "only to discover the conflict has deeper roots than imagined",
      "as time runs out and stakes continue to escalate",
      "while questioning everything they believed to be true"
    ];
    
    const complication = complications[Math.floor(Math.random() * complications.length)];
    return `${conflict} ${complication}`;
  }
  
  private static addPlotTwists(plotPoints: string[]): string[] {
    const twists = [
      "A trusted ally reveals their true agenda",
      "The protagonist discovers they're connected to the antagonist",
      "What seemed like victory leads to an even greater challenge",
      "A character presumed dead returns at a crucial moment",
      "The solution requires an unexpected sacrifice"
    ];
    
    const enhancedPoints = [...plotPoints];
    
    // Add 1-2 plot twists
    const numTwists = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < numTwists && enhancedPoints.length < 7; i++) {
      const twist = twists[Math.floor(Math.random() * twists.length)];
      const insertIndex = Math.floor(Math.random() * (enhancedPoints.length - 1)) + 1;
      enhancedPoints.splice(insertIndex, 0, twist);
    }
    
    return enhancedPoints;
  }
  
  private static enhancePremise(premise: string): string {
    const enhancements = [
      "But beneath the surface lies a web of deception that challenges everything they believe.",
      "However, their greatest enemy may be the darkness within themselves.",
      "Yet the price of victory may be higher than they're willing to pay.",
      "But as they delve deeper, they realize the fate of more than just themselves hangs in the balance."
    ];
    
    const enhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    return `${premise} ${enhancement}`;
  }
}