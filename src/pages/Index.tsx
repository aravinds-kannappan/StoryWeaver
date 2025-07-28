import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, BookOpen, Wand2 } from "lucide-react";
import { GenreSelector, Genre } from "@/components/GenreSelector";
import { ThemeSelector, Theme } from "@/components/ThemeSelector";
import { StoryDisplay } from "@/components/StoryDisplay";
import { OutlineAgent, RefinementAgent } from "@/lib/storyAgents";
import { useToast } from "@/hooks/use-toast";

interface Story {
  title: string;
  chapters: {
    title: string;
    content: string;
  }[];
  themes: string[];
  tone: string;
  summary: string;
}

const Index = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [story, setStory] = useState<Story | null>(null);
  const [refinedStory, setRefinedStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const { toast } = useToast();

  const handleGenreToggle = (genre: Genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleThemeToggle = (theme: Theme) => {
    setSelectedThemes(prev => 
      prev.includes(theme)
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const generateStory = async () => {
    if (!customPrompt.trim() && (selectedGenres.length === 0 || selectedThemes.length === 0)) {
      toast({
        title: "Input Required",
        description: "Please enter a custom prompt or select at least one genre and one theme.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setStory(null);
    setRefinedStory(null);

    try {
      const generatedStory = await OutlineAgent.generateStory(customPrompt || "", selectedGenres, selectedThemes);
      setStory(generatedStory);
      toast({
        title: "Story Generated!",
        description: "Your full story has been created by our Story Agent.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Something went wrong while generating your story. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const refineStory = async () => {
    if (!story) return;

    setIsRefining(true);
    try {
      const refined = await RefinementAgent.refineStory(story);
      setRefinedStory(refined);
      toast({
        title: "Story Refined!",
        description: "Your story has been enhanced with deeper character development and plot twists.",
      });
    } catch (error) {
      toast({
        title: "Refinement Failed",
        description: "Something went wrong while refining your story. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefining(false);
    }
  };

  const resetStory = () => {
    setStory(null);
    setRefinedStory(null);
    setSelectedGenres([]);
    setSelectedThemes([]);
    setCustomPrompt("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-story-glow/10 to-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-story-accent bg-clip-text text-transparent">
              StoryWeaver
            </h1>
            <Wand2 className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Harness the power of AI storytelling. Two specialized agents work together to craft compelling narratives tailored to your vision.
          </p>
        </div>

        {/* Agent Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Outline Agent</h3>
            </div>
            <p className="text-muted-foreground">
              Creates compelling story structures based on your selected genres and themes, establishing characters, conflicts, and plot foundations.
            </p>
          </Card>

          <Card className="p-6 border-story-accent/20 hover:border-story-accent/40 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-story-accent/10 rounded-lg flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-story-accent" />
              </div>
              <h3 className="text-lg font-semibold">Refinement Agent</h3>
            </div>
            <p className="text-muted-foreground">
              Enhances your story with deeper character development, unexpected plot twists, and narrative complexity for richer storytelling.
            </p>
          </Card>
        </div>

        {/* Story Generation Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Custom Story Prompt</h3>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe your story idea... (e.g., 'A detective investigating supernatural crimes in modern Tokyo')"
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Enter a custom prompt or use the genre/theme selectors below
              </p>
            </Card>

            <GenreSelector 
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
            />
            
            <ThemeSelector
              selectedThemes={selectedThemes}
              onThemeToggle={handleThemeToggle}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={generateStory}
                disabled={isGenerating || (!customPrompt.trim() && (selectedGenres.length === 0 || selectedThemes.length === 0))}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-story"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Story
                  </>
                )}
              </Button>
              
              {(story || refinedStory) && (
                <Button
                  onClick={resetStory}
                  variant="outline"
                  size="lg"
                >
                  New Story
                </Button>
              )}
            </div>
          </div>

          {/* Right Column - Story Display */}
          <div>
            <StoryDisplay
              story={story}
              refinedStory={refinedStory}
              isGenerating={isGenerating}
              isRefining={isRefining}
              onRefine={refineStory}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          <p>Powered by AI Agents • Built with React & TypeScript</p>
        </div>
      </div>
    </div>
  );
};

export default Index;