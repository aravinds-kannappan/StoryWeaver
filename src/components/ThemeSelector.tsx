import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Theme = "Love" | "Betrayal" | "Redemption" | "Power" | "Sacrifice" | "Discovery" | "Revenge" | "Hope" | "Loss" | "Transformation";

interface ThemeSelectorProps {
  selectedThemes: Theme[];
  onThemeToggle: (theme: Theme) => void;
}

const themes: Theme[] = ["Love", "Betrayal", "Redemption", "Power", "Sacrifice", "Discovery", "Revenge", "Hope", "Loss", "Transformation"];

export const ThemeSelector = ({ selectedThemes, onThemeToggle }: ThemeSelectorProps) => {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Select Themes</h3>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <Badge
            key={theme}
            variant={selectedThemes.includes(theme) ? "default" : "secondary"}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedThemes.includes(theme)
                ? "bg-primary text-primary-foreground shadow-story"
                : "hover:bg-primary/10"
            }`}
            onClick={() => onThemeToggle(theme)}
          >
            {theme}
          </Badge>
        ))}
      </div>
    </Card>
  );
};