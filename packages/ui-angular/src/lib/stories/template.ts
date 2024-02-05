import { argsToTemplate } from '@storybook/angular';
import { ArgsToTemplateOptions } from '@storybook/angular/dist/client/argsToTemplate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function aliasedArgsToTemplate<T extends Record<string, any>>(
  args: T,
  alias: string,
  options?: ArgsToTemplateOptions<keyof T>,
): string {
  const aliasedArgs = Object.entries(args).map(([key, value]) => [
    `${alias}${key[0]?.toUpperCase()}${key.slice(1)}`,
    value as unknown,
  ]);

  const aliasedOptions = {
    include: options?.include?.map((value) => alias + value.toString()),
    exclude: options?.exclude?.map((value) => alias + value.toString()),
  };

  return argsToTemplate(Object.fromEntries(aliasedArgs) as T, aliasedOptions);
}
