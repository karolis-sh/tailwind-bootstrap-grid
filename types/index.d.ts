declare module 'tailwind-bootstrap-grid' {
  import { PluginCreator } from 'tailwindcss/types/config';

  interface TailwindBootstrapGridOptions {
    grid_columns?: number;
    grid_gutter_width?: string;
    grid_gutters?: string[];
    generate_container?: boolean;
    container_max_widths?: string[];
    rtl?: boolean;
  }

  function tailwindBootstrapGrid(
    options?: TailwindBootstrapGridOptions,
  ): PluginCreator;
  export = tailwindBootstrapGrid;
}
