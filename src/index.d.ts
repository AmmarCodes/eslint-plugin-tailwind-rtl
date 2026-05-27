import { ESLint, Linter, Rule } from "eslint";

interface PluginMeta {
  name: string;
  version: string;
}

interface RuleMeta {
  type: "problem" | "suggestion" | "layout";
  docs: {
    description: string;
    recommended?: boolean;
    url?: string;
  };
  fixable?: "code" | "whitespace";
  messages: Record<string, string>;
  schema: unknown[];
}

interface TailwindRtlPlugin {
  meta: PluginMeta;
  rules: {
    "tailwind/no-physical-classes": Rule.RuleModule;
    "css-in-js/no-physical-properties": Rule.RuleModule;
    "css-in-js/no-physical-values": Rule.RuleModule;
  };
  configs: {
    recommended: Linter.FlatConfig;
    "recommended-tailwind": Linter.FlatConfig;
  };
}

declare const plugin: TailwindRtlPlugin;

export = plugin;
