/**
 * Interface definition for DeepSeek Harness / Cordis Context
 */
export interface PluginConfig {
  enabled?: boolean;
  fontFamily?: string;
  weights?: number[];
  includeCodeBlocks?: boolean;
}

export interface WebServerContext {
  tapIndex?: (transformer: (html: string) => string) => void;
  [key: string]: any;
}

export interface Context {
  webServer?: WebServerContext;
  [key: string]: any;
}

const DEFAULT_CONFIG: Required<PluginConfig> = {
  enabled: true,
  fontFamily: '"LINE Seed JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
  weights: [100, 400, 700, 900],
  includeCodeBlocks: false,
};

export const name = 'dsh-plugin-font-line-seed-jp';

/**
 * DeepSeek Harness Plugin entry point
 */
export function apply(ctx: Context, config?: PluginConfig): void {
  const mergedConfig: Required<PluginConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  if (!mergedConfig.enabled) {
    return;
  }

  const weightQuery = mergedConfig.weights.join(';');
  const googleFontUrl = `https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@${weightQuery}&display=swap`;

  const cssStyle = `
<!-- [dsh-plugin-font-line-seed-jp] Google Web Fonts (LINE Seed JP) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${googleFontUrl}">
<style id="dsh-plugin-font-line-seed-jp-style">
  :root {
    --dsh-font-family-base: ${mergedConfig.fontFamily};
    --dsh-font-family-ui: ${mergedConfig.fontFamily};
    --dsh-font-sans: ${mergedConfig.fontFamily};
  }

  /* Force application-wide typography */
  html,
  body,
  button,
  input,
  optgroup,
  select,
  textarea,
  [class*="theme-"],
  [class*="app-"],
  .dsh-root,
  #root,
  #app {
    font-family: ${mergedConfig.fontFamily} !important;
  }

  ${
    mergedConfig.includeCodeBlocks
      ? `
  code,
  kbd,
  samp,
  pre {
    font-family: ${mergedConfig.fontFamily} !important;
  }
  `
      : ''
  }
</style>
`;

  // Register tapIndex if webServer is available
  if (ctx.webServer && typeof ctx.webServer.tapIndex === 'function') {
    ctx.webServer.tapIndex((html: string) => {
      if (html.includes('dsh-plugin-font-line-seed-jp-style')) {
        return html;
      }

      if (html.includes('</head>')) {
        return html.replace('</head>', `${cssStyle}\n</head>`);
      }

      if (html.includes('<head>')) {
        return html.replace('<head>', `<head>\n${cssStyle}`);
      }

      return `${cssStyle}\n${html}`;
    });
  }
}

export default {
  name,
  apply,
};
