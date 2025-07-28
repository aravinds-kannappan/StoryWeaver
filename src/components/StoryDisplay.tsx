import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";

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

interface StoryDisplayProps {
  story: Story | null;
  refinedStory: Story | null;
  isGenerating: boolean;
  isRefining: boolean;
  onRefine: () => void;
}

export const StoryDisplay = ({ 
  story, 
  refinedStory, 
  isGenerating, 
  isRefining, 
  onRefine 
}: StoryDisplayProps) => {
  const displayStory = refinedStory || story;

  if (isGenerating) {
    return (
      <Card className="p-8 text-center animate-story-glow">
        <div className="space-y-4">
          <Sparkles className="w-12 h-12 mx-auto text-primary animate-spin" />
          <h3 className="text-xl font-semibold">Weaving Your Story...</h3>
          <p className="text-muted-foreground">Our Story Agent is crafting your full narrative with chapters</p>
        </div>
      </Card>
    );
  }

  if (!displayStory) {
    return (
      <Card className="p-8 text-center border-dashed border-2">
        <div className="space-y-4 text-muted-foreground">
          <Sparkles className="w-12 h-12 mx-auto opacity-50" />
          <h3 className="text-xl font-semibold">Ready to Create</h3>
          <p>Enter a custom prompt or select genres and themes to generate your full story</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 animate-fade-in">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">{displayStory.title}</h2>
            <Badge variant="outline" className="text-story-accent">
              {displayStory.tone}
            </Badge>
          </div>
          {story && !refinedStory && !isRefining && (
            <Button 
              onClick={onRefine}
              className="bg-story-accent hover:bg-story-accent/90 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refine Story
            </Button>
          )}
          {isRefining && (
            <Button disabled className="bg-story-accent/50">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Refining...
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-primary mb-2">Story Summary</h3>
            <p className="text-foreground/80 leading-relaxed">{displayStory.summary}</p>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-2">Themes</h3>
            <div className="flex flex-wrap gap-2">
              {displayStory.themes.map((theme, index) => (
                <Badge key={index} variant="secondary">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {refinedStory && (
          <div className="mt-6 pt-4 border-t border-border">
            <Badge className="bg-story-secondary text-story-primary">
              ✨ Enhanced by Refinement Agent
            </Badge>
          </div>
        )}
      </Card>

      {/* Chapters */}
      <div className="space-y-4">
        {displayStory.chapters.map((chapter, index) => (
          <Card key={index} className="p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-primary mb-4">
              Chapter {index + 1}: {chapter.title}
            </h3>
            <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
              {chapter.content}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};