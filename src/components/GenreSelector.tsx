import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Genre = "Fantasy" | "Sci-Fi" | "Mystery" | "Romance" | "Horror" | "Adventure" | "Thriller" | "Historical";

interface GenreSelectorProps {
  selectedGenres: Genre[];
  onGenreToggle: (genre: Genre) => void;
}

const genres: Genre[] = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Horror", "Adventure", "Thriller", "Historical"];

export const GenreSelector = ({ selectedGenres, onGenreToggle }: GenreSelectorProps) => {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Select Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenres.includes(genre) ? "default" : "secondary"}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedGenres.includes(genre)
                ? "bg-primary text-primary-foreground shadow-story"
                : "hover:bg-primary/10"
            }`}
            onClick={() => onGenreToggle(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>
    </Card>
  );
};