import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";

interface StoryOutline {
  title: string;
  premise: string;
  mainCharacter: string;
  conflict: string;
  plotPoints: string[];
  themes: string[];
  tone: string;
}

interface StoryDisplayProps {
  outline: StoryOutline | null;
  refinedOutline: StoryOutline | null;
  isGenerating: boolean;
  isRefining: boolean;
  onRefine: () => void;
}

export const StoryDisplay = ({ 
  outline, 
  refinedOutline, 
  isGenerating, 
  isRefining, 
  onRefine 
}: StoryDisplayProps) => {
  const displayOutline = refinedOutline || outline;

  if (isGenerating) {
    return (
      <Card className="p-8 text-center animate-story-glow">
        <div className="space-y-4">
          <Sparkles className="w-12 h-12 mx-auto text-primary animate-spin" />
          <h3 className="text-xl font-semibold">Weaving Your Story...</h3>
          <p className="text-muted-foreground">Our Outline Agent is crafting your narrative structure</p>
        </div>
      </Card>
    );
  }

  if (!displayOutline) {
    return (
      <Card className="p-8 text-center border-dashed border-2">
        <div className="space-y-4 text-muted-foreground">
          <Sparkles className="w-12 h-12 mx-auto opacity-50" />
          <h3 className="text-xl font-semibold">Ready to Create</h3>
          <p>Select your genres and themes, then generate your story outline</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{displayOutline.title}</h2>
          <Badge variant="outline" className="text-story-accent">
            {displayOutline.tone}
          </Badge>
        </div>
        {outline && !refinedOutline && !isRefining && (
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
          <h3 className="font-semibold text-primary mb-2">Premise</h3>
          <p className="text-foreground/80 leading-relaxed">{displayOutline.premise}</p>
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-2">Main Character</h3>
          <p className="text-foreground/80">{displayOutline.mainCharacter}</p>
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-2">Central Conflict</h3>
          <p className="text-foreground/80">{displayOutline.conflict}</p>
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-2">Key Plot Points</h3>
          <ol className="space-y-2">
            {displayOutline.plotPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground/80">{point}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-2">Themes</h3>
          <div className="flex flex-wrap gap-2">
            {displayOutline.themes.map((theme, index) => (
              <Badge key={index} variant="secondary">
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {refinedOutline && (
        <div className="mt-6 pt-4 border-t border-border">
          <Badge className="bg-story-secondary text-story-primary">
            ✨ Enhanced by Refinement Agent
          </Badge>
        </div>
      )}
    </Card>
  );
};