import { useTheme } from "next-themes";
import { Settings as SettingsIcon, Type, Moon, Sun, Monitor, Languages } from "lucide-react";
import { useAppStore } from "@/lib/store";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const LANGUAGES = ["English", "Hindi", "Kannada", "Tamil", "Bengali", "Hinglish"];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize, selectedLanguage, setSelectedLanguage } = useAppStore();

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <SettingsIcon className="text-primary w-8 h-8" />
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your app preferences and learning experience.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5" /> Appearance
            </CardTitle>
            <CardDescription>Choose how ShikshaSetu looks to you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base">Theme</Label>
              <RadioGroup 
                defaultValue={theme || "system"} 
                onValueChange={(val) => setTheme(val)}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors flex-1">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer flex-1 font-medium">
                    <Sun className="w-4 h-4" /> Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors flex-1">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer flex-1 font-medium">
                    <Moon className="w-4 h-4" /> Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors flex-1">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system" className="flex items-center gap-2 cursor-pointer flex-1 font-medium">
                    <Monitor className="w-4 h-4" /> System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <Label className="text-base flex items-center gap-2">
                  <Type className="w-4 h-4" /> Global Font Size
                </Label>
                <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium">A</span>
                <Slider 
                  value={[fontSize]} 
                  min={12} 
                  max={24} 
                  step={1} 
                  onValueChange={(val) => setFontSize(val[0])}
                  className="flex-1"
                />
                <span className="text-lg font-medium">A</span>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                This adjusts the base font size for the entire application to make reading easier.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5" /> Learning Preferences
            </CardTitle>
            <CardDescription>Set your default learning environment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label className="text-base">Default Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select default language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                This will be pre-selected when generating new lessons and quizzes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
